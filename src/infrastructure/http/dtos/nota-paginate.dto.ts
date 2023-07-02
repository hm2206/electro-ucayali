import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDefined, IsNumber, IsOptional } from 'class-validator';

export class NotaPaginateDto {
  @ApiProperty()
  @Transform(({ value }) => parseInt(value))
  @IsDefined()
  @IsNumber()
  page: number;

  @ApiProperty()
  @Transform(({ value }) => parseInt(value))
  @IsDefined()
  @IsNumber()
  limit: number;

  @ApiPropertyOptional()
  @IsOptional()
  querySearch?: string;
}
