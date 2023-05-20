import { IBaseServiceInterface } from 'src/shared/interfaces/base-service.interface';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Paginate } from 'src/shared/utils/paginate';
import { ProductoOrm } from 'src/infrastructure/database/orm/producto.orm';

export class ProductoPaginateService implements IBaseServiceInterface {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute(
    request: ProductoPaginateRequest,
  ): Promise<Pagination<ProductoOrm>> {
    const productoRepository = this.unitOfWork.productoRepository;
    const queryBuilder = productoRepository
      .createQueryBuilder('p')
      .innerJoinAndSelect('p.marca', 'ma')
      .innerJoinAndSelect('p.medida', 'me');
    // filter
    if (request.querySearch) {
      queryBuilder.andWhere(
        `(UPPER(p.code) like UPPER('%${request.querySearch}%') OR UPPER(p.name) like UPPER('%${request.querySearch}%') OR UPPER(p.description) like UPPER('%${request.querySearch}%'))`,
      );
    }
    // response
    return paginate<ProductoOrm>(queryBuilder, request);
  }
}

export class ProductoPaginateRequest extends Paginate {}
