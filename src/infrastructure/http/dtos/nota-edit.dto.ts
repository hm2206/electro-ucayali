import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsDefined,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { NotaTypeEnum } from 'src/domain/enums/nota.enum';

export class NotaEditItemDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  id: string;

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsDefined()
  @IsUUID(4)
  productoId: string;
}

export class NotaEditDto {
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

  @ApiProperty()
  @IsDefined()
  @IsBoolean()
  state: boolean;

  @ApiProperty({ type: NotaEditItemDto, isArray: true })
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => NotaEditItemDto)
  items: NotaEditItemDto[];
}
