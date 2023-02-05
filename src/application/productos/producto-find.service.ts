import { IdentifyUUID } from 'src/domain/value-objects/identify-uuid';
import { IBaseServiceInterface } from 'src/shared/interfaces/base-service.interface';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';

export class ProductoFindService implements IBaseServiceInterface {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute({ id }: ProductoFindRequest): Promise<any> {
    const productoRepository = this.unitOfWork.productoRepository;
    return productoRepository
      .createQueryBuilder('p')
      .innerJoinAndSelect('p.marca', 'ma')
      .innerJoinAndSelect('p.medida', 'me')
      .where(`p.id = '${id.getValue()}'`)
      .getOneOrFail();
  }
}

export class ProductoFindRequest {
  id: IdentifyUUID;
}
