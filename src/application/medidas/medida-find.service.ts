import { IdentifyUUID } from 'src/domain/value-objects/identify-uuid';
import { IBaseServiceInterface } from 'src/shared/interfaces/base-service.interface';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';

export class MedidaFindService implements IBaseServiceInterface {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute({ id }: MedidaFindRequest): Promise<any> {
    const medidaRepository = this.unitOfWork.medidaRepository;
    return medidaRepository.findOneOrFail({ where: { id: id.getValue() } });
  }
}

export class MedidaFindRequest {
  id: IdentifyUUID;
}
