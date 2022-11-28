import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';
import { LugarCreateRequest } from 'src/application/lugares/lugar-create.service';

export class LugarCreateDto extends LugarCreateRequest {
  @ApiProperty()
  @IsDefined()
  @IsString()
  name: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  description: string;
}
