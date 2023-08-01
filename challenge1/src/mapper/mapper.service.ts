import { Injectable } from '@nestjs/common';
import { SnsEventDto } from './dto/sns-event.dto';
import { plainToClass } from 'class-transformer';

import dayjs from '../utils/dayjs';
import { MapperResponse } from './dto/mapper-response';
import { validateOrReject } from 'class-validator';

@Injectable()
export class MapperService {
  async mapper(snsEventDto: SnsEventDto): Promise<MapperResponse> {
    const data = snsEventDto.Records[0];
    const destinations = data.ses.mail.destination.map(
      (item) => item.split('@')[0],
    );
    const mappedEmail = plainToClass(MapperResponse, {
      spam: data.ses.receipt.spamVerdict.status === 'PASS',
      virus: data.ses.receipt.virusVerdict.status === 'PASS',
      dns:
        data.ses.receipt.dkimVerdict.status === 'PASS' &&
        data.ses.receipt.spfVerdict.status === 'PASS' &&
        data.ses.receipt.dmarcVerdict.status === 'PASS',
      mes: dayjs(data.ses.mail.timestamp).format('MMMM'),
      retrasado: data.ses.receipt.processingTimeMillis > 1000,
      emisor: data.ses.mail.source.split('@')[0],
      receptor: destinations,
    });

    await validateOrReject(mappedEmail);

    return mappedEmail;
  }
}
