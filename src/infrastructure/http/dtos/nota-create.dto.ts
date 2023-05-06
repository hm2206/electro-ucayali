import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsDefined,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { NotaCreateRequest } from 'src/application/notas/nota-create.service';
import { NotaTypeEnum } from 'src/domain/enums/nota.enum';
import { ItemCreateDto } from './item-create.dto';
import { Type } from 'class-transformer';

export class NotaCreateDto extends NotaCreateRequest {
  @ApiProperty()
  @IsDefined()
  code: string;

  @ApiProperty()
  @IsDefined()
  @IsDateString()
  date: Date;

  @ApiProperty()
  @IsDefined()
  @IsString()
  documentCrp: string;

  @ApiProperty({ enum: NotaTypeEnum })
  @IsDefined()
  @IsEnum(NotaTypeEnum)
  type: NotaTypeEnum;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  observation?: string;

  @ApiProperty()
  @IsDefined()
  @IsUUID()
  areaId: string;

  @ApiProperty()
  @IsDefined()
  @IsUUID()
  lugarId: string;

  @ApiProperty({ type: ItemCreateDto })
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => NotaCreateItemDto)
  items: NotaCreateItemDto[];
}

export class NotaCreateItemDto {
  @ApiProperty()
  @IsDefined()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsDefined()
  @IsUUID(4)
  productoId: string;

  @ApiProperty()
  @IsDefined()
  @IsUUID(4)
  medidaId: string;
}
