import { IdentifyUUID } from 'src/domain/value-objects/identify-uuid';
import { IBaseServiceInterface } from 'src/shared/interfaces/base-service.interface';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';

export class AreaFindService implements IBaseServiceInterface {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute({ id }: AreaFindRequest): Promise<any> {
    const areaRepository = this.unitOfWork.areaRepository;
    return areaRepository.findOneOrFail({ where: { id: id.getValue() } });
  }
}

export class AreaFindRequest {
  id: IdentifyUUID;
}
