import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDefined } from 'class-validator';
import { MarcaCreateRequest } from 'src/application/marcas/marca-create.service';
import { NoneEmptyString } from 'src/domain/value-objects/none-empty-string';

export class MarcaCreateDto extends MarcaCreateRequest {
  @ApiProperty()
  @IsDefined()
  @Transform(({ value }) => new NoneEmptyString(value))
  name: NoneEmptyString;

  @ApiProperty()
  @IsDefined()
  @Transform(({ value }) => new NoneEmptyString(value))
  description: NoneEmptyString;
}
