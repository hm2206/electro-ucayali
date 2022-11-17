import { IdentifyUUID } from 'src/domain/value-objects/identify-uuid';
import { IBaseServiceInterface } from 'src/shared/interfaces/base-service.interface';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';

export class LugarFindService implements IBaseServiceInterface {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute({ id }: LugarFindRequest): Promise<any> {
    const lugarRepository = this.unitOfWork.lugarRepository;
    return lugarRepository.findOneOrFail({ where: { id: id.getValue() } });
  }
}

export class LugarFindRequest {
  id: IdentifyUUID;
}
