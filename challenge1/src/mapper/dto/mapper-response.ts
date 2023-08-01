import { IsBoolean, IsArray, IsString } from 'class-validator';

export class MapperResponse {
  @IsBoolean()
  spam: boolean;

  @IsBoolean()
  virus: boolean;

  @IsBoolean()
  dns: boolean;

  @IsString()
  mes: string;

  @IsBoolean()
  retrasado: boolean;

  @IsString()
  emisor: string;

  @IsArray()
  receptor: string[];
}
