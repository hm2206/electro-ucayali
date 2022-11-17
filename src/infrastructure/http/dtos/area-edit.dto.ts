import { Transform } from 'class-transformer';
import { IsDefined } from 'class-validator';
import { AreaEditRequest } from 'src/application/areas/area-edit.service';
import { NoneEmptyString } from 'src/domain/value-objects/none-empty-string';

export class AreaEditDto extends AreaEditRequest {
  @IsDefined()
  @Transform(({ value }) => new NoneEmptyString(value))
  name: NoneEmptyString;

  @IsDefined()
  @Transform(({ value }) => new NoneEmptyString(value))
  description: NoneEmptyString;
}
