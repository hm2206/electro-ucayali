import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ProductoCreateRequest } from 'src/application/productos/producto-create.service';

export class ProductoCreateDto extends ProductoCreateRequest {
  @ApiProperty()
  @IsDefined()
  @IsString()
  code: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  codePatrimonial?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  serie?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  potencia?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  year?: number;

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
}
