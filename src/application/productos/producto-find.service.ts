import { IdentifyUUID } from 'src/domain/value-objects/identify-uuid';
import { IBaseServiceInterface } from 'src/shared/interfaces/base-service.interface';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';

export class ProductoFindService implements IBaseServiceInterface {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute({ id }: ProductoFindRequest): Promise<any> {
    const productoRepository = this.unitOfWork.productoRepository;
    return productoRepository.findOneOrFail({ where: { id: id.getValue() } });
  }
}

export class ProductoFindRequest {
  id: IdentifyUUID;
}
