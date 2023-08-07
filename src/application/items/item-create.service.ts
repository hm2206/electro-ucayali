import { ItemEntity } from 'src/domain/entities/item';
import { Producto } from 'src/domain/entities/producto';
import { IdentifyUUID } from 'src/domain/value-objects/identify-uuid';
import { IBaseServiceInterface } from 'src/shared/interfaces/base-service.interface';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';

export class ItemCreateService implements IBaseServiceInterface {
  constructor(private unitOfWork: IUnitOfWorkInterface) { }

  async execute(request: ItemCreateRequest): Promise<ItemEntity> {
    try {
      const { itemRepository, productoRepository } = this.unitOfWork;

      const producto: Producto = await productoRepository.findOne({
        where: { id: request.productoId },
      });

      if (!producto) throw new Error('No se encontró el producto');

      // validar stock
      if (request.isValid) {
        const newStock = producto.stock - request.amount;
        if (!newStock) {
          throw new Error(`El producto: ${producto.name} solo tiene en ${producto.stock}`);
        }

        producto.stock = newStock;
      } else {
        producto.stock += request.amount;
      }

      // actualizar stock
      await productoRepository.update(producto.id, { stock: producto.stock });

      const payload = {
        id: new IdentifyUUID().toString(),
        productoId: producto.id,
        ...request,
      };

      return itemRepository.save(payload);
    } catch (error) {
      throw new Error('No se pudo guardar');
    }
  }
}

export class ItemCreateRequest {
  amount: number;
  productoId: string;
  notaId: string;
  isValid: boolean;
}
