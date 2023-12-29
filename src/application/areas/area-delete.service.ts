import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';

export class AreaDeleteService {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute(id: string) {
    const { areaRepository, notaRepository } = this.unitOfWork;
    const area = await areaRepository.findOne({ where: { id } });
    if (!area) throw new Error('El regístro no existe!');
    const count = await notaRepository
      .createQueryBuilder('n')
      .andWhere(`n."areaId" = '${area.id}'`)
      .getCount();
    if (count) {
      await areaRepository.update(area.id, { state: false });
      return { message: 'Registro desactivado' };
    } else {
      await areaRepository.delete(area.id);
      return { message: 'Registro eliminado!!!' };
    }
  }
}
