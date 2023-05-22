import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber, IsString } from 'class-validator';
import { DetailEditRequest } from 'src/application/detail/detail-edit.service';

export class DetalleEditDto implements DetailEditRequest {
  @ApiProperty()
  @IsDefined()
  @IsNumber()
  year: number;

  @ApiProperty()
  @IsDefined()
  @IsString()
  serie: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  potencia: string;
}
