import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PingResponse } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async ping(): Promise<PingResponse> {
    return this.appService.ping();
  }
}
