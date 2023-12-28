import { IBaseServiceInterface } from 'src/shared/interfaces/base-service.interface';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';
import { MotivoFindRequest } from './motivo-find.service';

export class MotivoDeleteService implements IBaseServiceInterface {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute(params: MotivoFindRequest) {
    const { motivoRepository, notaRepository } = this.unitOfWork;
    await this.unitOfWork.start();
    const motivo = await motivoRepository.findOne({ where: params });
    if (!motivo) throw new Error('No se encontró el motivo');
    const count = await notaRepository
      .createQueryBuilder()
      .andWhere(`motivoId = '${motivo.id}'`)
      .getCount();
    if (count) {
      await motivoRepository.update(motivo.id, { state: false });
      return { message: 'Registro desactivado' };
    } else {
      await motivoRepository.delete(motivo.id);
      return { message: 'Registro eliminado' };
    }
  }
}
