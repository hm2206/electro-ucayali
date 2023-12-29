import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDefined, IsString } from 'class-validator';
import { AreaEditRequest } from 'src/application/areas/area-edit.service';

export class AreaEditDto extends AreaEditRequest {
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
