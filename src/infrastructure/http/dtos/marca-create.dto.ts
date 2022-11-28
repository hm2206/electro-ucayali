import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';
import { MarcaCreateRequest } from 'src/application/marcas/marca-create.service';

export class MarcaCreateDto extends MarcaCreateRequest {
  @ApiProperty()
  @IsDefined()
  @IsString()
  name: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  description: string;
}
