import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AxiosService {
  async get(url: string): Promise<any> {
    try {
      const response = await axios.get(url);
      const { data, status } = response;
      if (status !== 200) {
        throw new Error('Error fetching URL.');
      }
      return data;
    } catch (error) {
      throw new Error('Error fetching URL.');
    }
  }
}
