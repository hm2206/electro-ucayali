import { IdentifyUUID } from 'src/domain/value-objects/identify-uuid';
import { IBaseServiceInterface } from 'src/shared/interfaces/base-service.interface';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';

export class MotivoCreateService implements IBaseServiceInterface {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute(request: MotivoCreateRequest) {
    const { motivoRepository } = this.unitOfWork;
    const payload = {
      ...request,
      id: new IdentifyUUID().toString(),
    };
    await this.unitOfWork.start();
    const data = motivoRepository.create(payload);
    return motivoRepository.save(data);
  }
}

export interface MotivoCreateRequest {
  name: string;
  description: string;
}
