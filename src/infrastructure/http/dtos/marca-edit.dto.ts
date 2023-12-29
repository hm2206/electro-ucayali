import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDefined, IsString } from 'class-validator';
import { MedidaEditRequest } from 'src/application/medidas/medida-edit.service';

export class MarcaEditDto extends MedidaEditRequest {
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
