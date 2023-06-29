import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsDefined,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { NotaTypeEnum } from 'src/domain/enums/nota.enum';

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
}
