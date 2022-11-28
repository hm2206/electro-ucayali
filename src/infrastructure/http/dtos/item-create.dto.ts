import { IsDefined, IsNumber, IsString, IsUUID } from 'class-validator';
import { ItemCreateRequest } from 'src/application/items/item-create.service';

export class ItemCreateDto extends ItemCreateRequest {
  @IsDefined()
  @IsString()
  codePatrimonial: string;

  @IsDefined()
  @IsNumber()
  amount: number;

  @IsDefined()
  @IsUUID(4)
  productoId: string;

  @IsDefined()
  @IsUUID(4)
  medidaId: string;

  @IsDefined()
  @IsUUID(4)
  notaId: string;
}
