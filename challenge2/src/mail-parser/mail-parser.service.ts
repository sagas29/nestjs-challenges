import { Injectable } from '@nestjs/common';
import { simpleParser } from 'mailparser';
import * as fs from 'fs';
import { AxiosService, findUrls } from '../utils';

@Injectable()
export class MailParserService {
  constructor(private readonly axiosService: AxiosService) {}

  async getJSON(path: string) {
    const isUrl = path.startsWith('http');
    let emailData = null;
    if (isUrl) {
      emailData = await this.axiosService.get(path);
    } else {
      emailData = fs.readFileSync(path, 'utf8');
    }
    const mail = await simpleParser(emailData);

    // Check if the JSON is in the attachments.
    if (mail?.attachments.length > 0) {
      const jsonAttachment = mail.attachments.find((attachment) =>
        attachment.filename.endsWith('.json'),
      );
      if (jsonAttachment) {
        return JSON.parse(jsonAttachment.content.toString());
      }
    }

    // Check if in the body of the email there is a URL to a JSON file or a website.
    if (mail?.text.length > 0) {
      const { text } = mail;
      const urls = findUrls(text);
      for await (const url of urls) {
        const isJson = url.includes('.json');
        // URL is a JSON file
        if (isJson) {
          return await this.axiosService.get(url);
        } else {
          //Check if the URL is a website, then check JSON files in the website.
          const website = await this.axiosService.get(url);
          if (website) {
            const siteUrls = findUrls(website);
            for await (const siteUrl of siteUrls) {
              const isSiteJson = siteUrl.includes('.json');
              if (isSiteJson) {
                return await this.axiosService.get(siteUrl);
              }
            }
          }
        }
      }
    }

    return {
      error: 'No JSON file found',
    };
  }
}
