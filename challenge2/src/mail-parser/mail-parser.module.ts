import { Module } from '@nestjs/common';
import { MailParserService } from './mail-parser.service';
import { MailParserController } from './mail-parser.controller';
import { AxiosService } from '../utils/http/axios';

@Module({
  controllers: [MailParserController],
  imports: [],
  providers: [MailParserService, AxiosService],
})
export class MailParserModule {}
