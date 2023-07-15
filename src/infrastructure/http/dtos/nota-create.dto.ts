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
import { Type } from 'class-transformer';

export class NotaCreateItemDto {
  @ApiProperty()
  @IsDefined()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsDefined()
  @IsUUID(4)
  productoId: string;
}

export class NotaCreateDto extends NotaCreateRequest {
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

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  motivoId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  situacionId?: string;

  @ApiProperty({ type: NotaCreateItemDto, isArray: true })
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => NotaCreateItemDto)
  items: NotaCreateItemDto[];
}
