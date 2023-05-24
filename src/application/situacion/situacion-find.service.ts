import { IBaseServiceInterface } from 'src/shared/interfaces/base-service.interface';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';

export class SituacionFindService implements IBaseServiceInterface {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute(request: SituacionFindRequest): Promise<any> {
    const { situacionRepository } = this.unitOfWork;
    return situacionRepository.findOneOrFail({ where: request });
  }
}

export class SituacionFindRequest {
  id: string;
}
