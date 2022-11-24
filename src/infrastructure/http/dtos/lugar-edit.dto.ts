import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDefined } from 'class-validator';
import { LugarEditRequest } from 'src/application/lugares/lugar-edit.service';
import { NoneEmptyString } from 'src/domain/value-objects/none-empty-string';

export class LugarEditDto extends LugarEditRequest {
  @ApiProperty()
  @IsDefined()
  @Transform(({ value }) => new NoneEmptyString(value))
  name: NoneEmptyString;

  @ApiProperty()
  @IsDefined()
  @Transform(({ value }) => new NoneEmptyString(value))
  description: NoneEmptyString;
}
