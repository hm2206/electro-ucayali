import { Transform } from 'class-transformer';
import { IsDefined } from 'class-validator';
import { MarcaEditRequest } from 'src/application/marcas/marca-edit.service';
import { NoneEmptyString } from 'src/domain/value-objects/none-empty-string';

export class MedidaEditDto extends MarcaEditRequest {
  @IsDefined()
  @Transform(({ value }) => new NoneEmptyString(value))
  name: NoneEmptyString;

  @IsDefined()
  @Transform(({ value }) => new NoneEmptyString(value))
  description: NoneEmptyString;
}
