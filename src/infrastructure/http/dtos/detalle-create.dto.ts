import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber, IsString, IsUUID } from 'class-validator';
import { DetailCreateRequest } from 'src/application/detail/detail-create.service';

export class DetalleCreateDto implements DetailCreateRequest {
  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsUUID(4)
  productId: string;

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  year: number;

  @ApiProperty()
  @IsDefined()
  @IsString()
  serie: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  potencia: string;
}
