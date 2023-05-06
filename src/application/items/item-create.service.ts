import { ItemEntity } from 'src/domain/entities/item';
import { IdentifyUUID } from 'src/domain/value-objects/identify-uuid';
import { IBaseServiceInterface } from 'src/shared/interfaces/base-service.interface';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';

export class ItemCreateService implements IBaseServiceInterface {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute(request: ItemCreateRequest): Promise<ItemEntity> {
    try {
      const itemRepostitory = this.unitOfWork.itemRepository;
      const productoRepository = this.unitOfWork.productoRepository;

      const producto = await productoRepository.findOne({
        where: { id: request.productoId },
      });

      if (!producto) throw new Error('No se encontró el producto');

      const payload = {
        id: new IdentifyUUID().toString(),
        productoId: producto.id,
        ...request,
      };

      console.log(payload);

      return itemRepostitory.save(payload);
    } catch (error) {
      throw new Error('No se pudo guardar');
    }
  }
}

export class ItemCreateRequest {
  amount: number;
  productoId: string;
  medidaId: string;
  notaId: string;
}
