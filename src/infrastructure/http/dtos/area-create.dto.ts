import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDefined } from 'class-validator';
import { AreaCreateRequest } from 'src/application/areas/area-create.service';
import { NoneEmptyString } from 'src/domain/value-objects/none-empty-string';

export class AreaCreateDto extends AreaCreateRequest {
  @ApiProperty()
  @IsDefined()
  @Transform(({ value }) => new NoneEmptyString(value))
  name: NoneEmptyString;

  @ApiProperty()
  @IsDefined()
  @Transform(({ value }) => new NoneEmptyString(value))
  description: NoneEmptyString;
}
