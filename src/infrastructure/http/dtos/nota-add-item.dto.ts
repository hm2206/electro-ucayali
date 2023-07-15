import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber, IsUUID } from 'class-validator';

export class NotaAddItemDto {
  @ApiProperty()
  @IsDefined()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsDefined()
  @IsUUID(4)
  productoId: string;
}
