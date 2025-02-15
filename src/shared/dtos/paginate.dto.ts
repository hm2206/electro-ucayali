import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Paginate } from 'src/shared/utils/paginate';
import { OrderDto } from './order.dto';

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

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => (!!value ? JSON.parse(value) : undefined))
  state?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => OrderDto)
  orders: OrderDto<any>[];
}
