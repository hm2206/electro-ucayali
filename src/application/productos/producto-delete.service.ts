import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';

export class ProductoDeleteService {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute(id: string) {
    const productoRepository = this.unitOfWork.productoRepository;
    const producto = await productoRepository.findOne({ where: { id } });
    if (!producto) throw new Error('El regístro no existe!');
    return productoRepository.delete(producto.id);
  }
}
