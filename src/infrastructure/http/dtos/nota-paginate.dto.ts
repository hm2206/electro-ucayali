import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsDateString, IsDefined, IsNumber, IsOptional } from 'class-validator';

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

  @ApiPropertyOptional({ type: NotaPaginateRangeDateDto })
  @IsOptional()
  @Type(() => NotaPaginateRangeDateDto)
  rangeDate?: NotaPaginateRangeDateDto;
}
