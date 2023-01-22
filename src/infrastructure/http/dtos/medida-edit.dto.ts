import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';
import { MedidaEditRequest } from 'src/application/medidas/medida-edit.service';

export class MedidaEditDto extends MedidaEditRequest {
  @ApiProperty()
  @IsDefined()
  name: string;

  @ApiProperty()
  @IsDefined()
  description: string;
}
