import { IBaseServiceInterface } from 'src/shared/interfaces/base-service.interface';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';
import { SituacionFindRequest } from './situacion-find.service';

export class SituacionDeleteService implements IBaseServiceInterface {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute(params: SituacionFindRequest) {
    const { situacionRepository } = this.unitOfWork;
    await this.unitOfWork.start();
    const situacion = await situacionRepository.findOne({ where: params });
    if (!situacion) throw new Error('No se encontró la situación');
    return situacionRepository.delete(situacion);
  }
}
