import { Transform } from 'class-transformer';
import { IsDefined } from 'class-validator';
import { MedidaEditRequest } from 'src/application/medidas/medida-edit.service';
import { NoneEmptyString } from 'src/domain/value-objects/none-empty-string';

export class MarcaEditDto extends MedidaEditRequest {
  @IsDefined()
  @Transform(({ value }) => new NoneEmptyString(value))
  name: NoneEmptyString;

  @IsDefined()
  @Transform(({ value }) => new NoneEmptyString(value))
  description: NoneEmptyString;
}
