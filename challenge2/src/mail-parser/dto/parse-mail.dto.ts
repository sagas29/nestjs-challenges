import { IsString, IsNotEmpty } from 'class-validator';

export class ParseMailDto {
  @IsNotEmpty()
  @IsString()
  path: string;
}
