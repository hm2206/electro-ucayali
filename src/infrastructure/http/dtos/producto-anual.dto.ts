import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { ProductoAnualRequest } from 'src/application/productos/producto-anual.service';
import { NotaTypeEnum } from 'src/domain/enums/nota.enum';

export class ProductoAnualDto implements ProductoAnualRequest {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (!!value ? JSON.parse(`${value}`) : undefined))
  year?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(NotaTypeEnum)
  type?: NotaTypeEnum;
}
