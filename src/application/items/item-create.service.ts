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

      // validar cantidad
      if (request.amount <= 0) {
        throw new Error(`La cantidad del producto: ${producto.name} debe ser mayor a cero`);
      }

      // validar stock
      if (request.isValid) {

        // valiadar stock cero
        if (producto.stock <= 0) {
          throw new Error(`No hay stock disponible para el producto: ${producto.name}`);
        }

        const newStock = producto.stock - request.amount;

        if (newStock < 0) {
          throw new Error(`El producto: ${producto.name} solo tiene ${producto.stock} en stock`);
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
      throw error;
    }
  }
}

export class ItemCreateRequest {
  amount: number;
  productoId: string;
  notaId: string;
  isValid: boolean;
}
