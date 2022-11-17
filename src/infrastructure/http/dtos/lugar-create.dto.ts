import { Transform } from 'class-transformer';
import { IsDefined } from 'class-validator';
import { LugarCreateRequest } from 'src/application/lugares/lugar-create.service';
import { NoneEmptyString } from 'src/domain/value-objects/none-empty-string';

export class LugarCreateDto extends LugarCreateRequest {
  @IsDefined()
  @Transform(({ value }) => new NoneEmptyString(value))
  name: NoneEmptyString;

  @IsDefined()
  @Transform(({ value }) => new NoneEmptyString(value))
  description: NoneEmptyString;
}
