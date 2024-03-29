import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber, IsUUID } from 'class-validator';
import { ItemCreateRequest } from 'src/application/items/item-create.service';

export class ItemCreateDto extends ItemCreateRequest {
  @ApiProperty()
  @IsDefined()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsDefined()
  @IsUUID(4)
  productoId: string;

  @ApiProperty()
  @IsDefined()
  @IsUUID(4)
  medidaId: string;

  @ApiProperty()
  @IsDefined()
  @IsUUID(4)
  notaId: string;
}
