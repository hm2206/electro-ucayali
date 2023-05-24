import { IdentifyUUID } from 'src/domain/value-objects/identify-uuid';
import { IBaseServiceInterface } from 'src/shared/interfaces/base-service.interface';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';

export class SituacionCreateService implements IBaseServiceInterface {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute(request: SituacionCreateRequest) {
    const { situacionRepository } = this.unitOfWork;
    const payload = {
      ...request,
      id: new IdentifyUUID().toString(),
    };
    await this.unitOfWork.start();
    const data = situacionRepository.create(payload);
    return situacionRepository.save(data);
  }
}

export class SituacionCreateRequest {
  name: string;
  description: string;
}
