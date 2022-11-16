import { IdentifyUUID } from 'src/domain/value-objects/identify-uuid';
import { IBaseServiceInterface } from 'src/shared/interfaces/base-service.interface';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';

export class MarcaFindService implements IBaseServiceInterface {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute({ id }: MarcaFindRequest): Promise<any> {
    const marcaRepository = this.unitOfWork.marcaRepository;
    return marcaRepository.findOneOrFail({ where: { id: id.getValue() } });
  }
}

export class MarcaFindRequest {
  id: IdentifyUUID;
}
