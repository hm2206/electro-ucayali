import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';

export class LugarDeleteService {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute(id: string) {
    const { lugarRepository, notaRepository } = this.unitOfWork;
    const lugar = await lugarRepository.findOne({ where: { id } });
    if (!lugar) throw new Error('El regístro no existe!');
    const count = await notaRepository
      .createQueryBuilder()
      .andWhere(`"lugarId" = '${lugar.id}'`)
      .getCount();
    if (count) {
      await lugarRepository.update(lugar.id, { state: false });
      return { message: 'Registro desactivado' };
    } else {
      await lugarRepository.delete(lugar.id);
      return { message: 'Registro eliminado' };
    }
  }
}
