import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsDefined,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class NotaPaginateRangeDateDto {
  @ApiProperty()
  @IsDefined()
  @IsDateString()
  dateStart: string;

  @ApiProperty()
  @IsDefined()
  @IsDateString()
  dateOver: string;
}

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

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => (!!value ? JSON.parse(value) : undefined))
  state?: boolean;

  @ApiPropertyOptional({ type: NotaPaginateRangeDateDto })
  @IsOptional()
  @Type(() => NotaPaginateRangeDateDto)
  rangeDate?: NotaPaginateRangeDateDto;
}
