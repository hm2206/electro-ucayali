import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDefined, IsString } from 'class-validator';
import { LugarEditRequest } from 'src/application/lugares/lugar-edit.service';

export class LugarEditDto extends LugarEditRequest {
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
