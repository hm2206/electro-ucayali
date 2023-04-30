import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { ProductoCreateRequest } from 'src/application/productos/producto-create.service';
import { ProductoItemInterface } from 'src/domain/interfaces/producto-item.interface';

class ProductoItem implements ProductoItemInterface {
  @ApiProperty()
  @IsDefined()
  @IsString()
  name: string;

  @ApiProperty()
  @IsDefined()
  value: any;
}

export class ProductoCreateDto extends ProductoCreateRequest {
  @ApiProperty()
  @IsDefined()
  @IsString()
  code: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  codePatrimonial?: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsUUID(4)
  medidaId: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsUUID(4)
  marcaId: string;

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  stock: number;

  @ApiProperty()
  @IsDefined()
  @ValidateNested()
  @Type(() => ProductoItem)
  attributos: ProductoItem[];
}
