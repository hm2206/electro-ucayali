import { Transform } from 'class-transformer';
import { IsDefined } from 'class-validator';
import { MedidaCreateRequest } from 'src/application/medidas/medida-create.service';
import { NoneEmptyString } from 'src/domain/value-objects/none-empty-string';

export class MedidaCreateDto extends MedidaCreateRequest {
  @IsDefined()
  @Transform(({ value }) => new NoneEmptyString(value))
  name: NoneEmptyString;

  @IsDefined()
  @Transform(({ value }) => new NoneEmptyString(value))
  description: NoneEmptyString;
}
