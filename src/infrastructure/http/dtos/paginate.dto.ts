import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Paginate } from 'src/shared/utils/paginate';

export class PaginateDto extends Paginate {
  @IsNumber()
  @Transform(({ value }) => parseInt(`${value}`))
  page: number;

  @IsNumber()
  @Transform(({ value }) => parseInt(`${value}`))
  limit: number;

  @IsOptional()
  @IsString()
  querySearch?: string;
}
