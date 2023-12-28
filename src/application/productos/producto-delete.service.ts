import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';

export class ProductoDeleteService {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute(id: string) {
    const { productoRepository, itemRepository } = this.unitOfWork;
    const producto = await productoRepository.findOne({ where: { id } });
    if (!producto) throw new Error('El regístro no existe!');
    const count = await itemRepository
      .createQueryBuilder()
      .andWhere(`productoId = '${producto.id}'`)
      .getCount();
    if (count) {
      await itemRepository.update(producto.id, { state: false });
      return { message: 'Registro desactivado' };
    } else {
      await productoRepository.delete(producto.id);
      return { message: 'Registro eliminado' };
    }
  }
}
