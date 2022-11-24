import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Paginate } from 'src/shared/utils/paginate';

export class PaginateDto extends Paginate {
  @ApiProperty()
  @IsNumber()
  @Transform(({ value }) => parseInt(`${value}`))
  page: number;

  @ApiProperty()
  @IsNumber()
  @Transform(({ value }) => parseInt(`${value}`))
  limit: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  querySearch?: string;
}
