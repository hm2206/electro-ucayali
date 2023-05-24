import { IBaseServiceInterface } from 'src/shared/interfaces/base-service.interface';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';
import { MotivoFindRequest } from './motivo-find.service';

export class MotivoDeleteService implements IBaseServiceInterface {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute(params: MotivoFindRequest) {
    const { motivoRepository } = this.unitOfWork;
    await this.unitOfWork.start();
    const motivo = await motivoRepository.findOne({ where: params });
    if (!motivo) throw new Error('No se encontró el motivo');
    return motivoRepository.delete(motivo);
  }
}
