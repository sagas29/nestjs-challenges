import { Get, Controller, Query } from '@nestjs/common';
import { ParseMailDto } from './dto/parse-mail.dto';
import { MailParserService } from './mail-parser.service';

@Controller({
  path: 'mail-parser',
})
export class MailParserController {
  constructor(private readonly mailParserService: MailParserService) {}
  @Get()
  async parseMail(@Query() parseMailDto: ParseMailDto): Promise<any> {
    const { path } = parseMailDto;
    return this.mailParserService.getJSON(path);
  }
}
