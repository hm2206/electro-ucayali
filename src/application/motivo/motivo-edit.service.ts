import { IBaseServiceInterface } from 'src/shared/interfaces/base-service.interface';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';
import { MotivoFindRequest } from './motivo-find.service';

export class MotivoEditService implements IBaseServiceInterface {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute(params: MotivoFindRequest, request: MotivoEditRequest) {
    const { motivoRepository } = this.unitOfWork;
    await this.unitOfWork.start();
    const motivo = await motivoRepository.findOne({ where: params });
    if (!motivo) throw new Error('No se encontró el motivo');
    motivo.name = request.name;
    motivo.description = request.description;
    return motivoRepository.save(motivo);
  }
}

export class MotivoEditRequest {
  name: string;
  description: string;
}
