import { Get, Controller, Body } from '@nestjs/common';
import { MapperService } from './mapper.service';
import { SnsEventDto } from './dto/sns-event.dto';
import { MapperResponse } from './dto/mapper-response';

@Controller({
  path: 'mapper',
})
export class MapperController {
  constructor(private readonly mapperService: MapperService) {}
  @Get()
  async mapper(@Body() snsEventDto: SnsEventDto): Promise<MapperResponse> {
    return this.mapperService.mapper(snsEventDto);
  }
}
