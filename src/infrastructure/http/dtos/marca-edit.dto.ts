import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDefined } from 'class-validator';
import { MedidaEditRequest } from 'src/application/medidas/medida-edit.service';
import { NoneEmptyString } from 'src/domain/value-objects/none-empty-string';

export class MarcaEditDto extends MedidaEditRequest {
  @ApiProperty()
  @IsDefined()
  @Transform(({ value }) => new NoneEmptyString(value))
  name: NoneEmptyString;

  @ApiProperty()
  @IsDefined()
  @Transform(({ value }) => new NoneEmptyString(value))
  description: NoneEmptyString;
}
