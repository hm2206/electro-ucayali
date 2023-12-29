import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDefined, IsString } from 'class-validator';
import { SituacionEditRequest } from 'src/application/situacion/situacion-edit.service';

export class SituacionEditDto extends SituacionEditRequest {
  @ApiProperty()
  @IsDefined()
  @IsString()
  name: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  description: string;

  @ApiProperty()
  @IsDefined()
  @IsBoolean()
  state: boolean;
}
