import { Item } from 'src/domain/entities/item';
import { Medida } from 'src/domain/entities/medida';
import { Nota } from 'src/domain/entities/nota';
import { Producto } from 'src/domain/entities/producto';
import { IdentifyUUID } from 'src/domain/value-objects/identify-uuid';
import { IBaseServiceInterface } from 'src/shared/interfaces/base-service.interface';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';

export class ItemCreateService implements IBaseServiceInterface {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute(request: ItemCreateRequest): Promise<Item> {
    const item = new Item();

    const medida = new Medida();
    medida.setId(new IdentifyUUID(request.medidaId));

    const producto = new Producto();
    producto.setId(new IdentifyUUID(request.productoId));

    const nota = new Nota();
    nota.setId(new IdentifyUUID(request.notaId));

    item.setAmount(request.amount);
    item.setMedida(medida);
    item.setProducto(producto);
    item.setNota(nota);

    const itemRepostitory = this.unitOfWork.itemRepository;
    item.load(await itemRepostitory.save(item));

    return item;
  }
}

export class ItemCreateRequest {
  codePatrimonial: string;
  amount: number;
  productoId: string;
  medidaId: string;
  notaId: string;
}
