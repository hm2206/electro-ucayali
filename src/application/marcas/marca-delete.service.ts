import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';

export class MarcaDeleteService {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute(id: string) {
    const { marcaRepository, productoRepository } = this.unitOfWork;
    const marca = await marcaRepository.findOne({ where: { id } });
    if (!marca) throw new Error('El regístro no existe!');
    const count = await productoRepository
      .createQueryBuilder()
      .andWhere(`marcaId = '${marca.id}'`)
      .getCount();
    if (count) {
      await marcaRepository.update(marca.id, { state: false });
      return { message: 'Registro desactivado' };
    } else {
      await marcaRepository.delete(marca.id);
      return { message: 'Registro eliminado' };
    }
  }
}
