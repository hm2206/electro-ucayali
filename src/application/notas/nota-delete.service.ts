import { IBaseServiceInterface } from 'src/shared/interfaces/base-service.interface';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';

export class NotaDeleteService implements IBaseServiceInterface {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute(id: string) {
    const { notaRepository, itemRepository } = this.unitOfWork;
    await this.unitOfWork.start();
    const nota = await notaRepository.findOne({ where: { id } });
    if (!nota) throw new Error('No se encontró la nota');
    const count = await itemRepository
      .createQueryBuilder()
      .andWhere(`notaId = '${nota.id}'`)
      .getCount();
    if (count) {
      await notaRepository.update(nota.id, { state: false });
      return { message: 'Registro desactivado' };
    } else {
      await notaRepository.delete(nota.id);
      return { message: 'Registro eliminado' };
    }
  }
}
