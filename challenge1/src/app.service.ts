import { Injectable } from '@nestjs/common';

export interface PingResponse {
  message: string;
}

@Injectable()
export class AppService {
  async ping(): Promise<PingResponse> {
    return {
      message: 'Server is running!',
    };
  }
}
