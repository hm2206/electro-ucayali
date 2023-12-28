import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';

export class MedidaDeleteService {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute(id: string) {
    const { medidaRepository, productoRepository } = this.unitOfWork;
    const medida = await medidaRepository.findOne({ where: { id } });
    if (!medida) throw new Error('El regístro no existe!');
    const count = await productoRepository
      .createQueryBuilder()
      .andWhere(`medidaId = '${medida.id}'`)
      .getCount();
    if (count) {
      await medidaRepository.update(medida.id, { state: false });
      return { message: 'Registro desactivado' };
    } else {
      await medidaRepository.delete(medida.id);
      return { message: 'Registro Eliminado' };
    }
  }
}
