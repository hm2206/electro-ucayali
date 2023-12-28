import { IBaseServiceInterface } from 'src/shared/interfaces/base-service.interface';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Paginate } from 'src/shared/utils/paginate';
import { LugarOrm } from 'src/infrastructure/database/orm/lugar.orm';

export class LugarPaginateService implements IBaseServiceInterface {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute(request: LugarPaginateRequest): Promise<Pagination<LugarOrm>> {
    const lugarRepository = this.unitOfWork.lugarRepository;
    const queryBuilder = lugarRepository.createQueryBuilder();
    // filter
    if (request.querySearch) {
      queryBuilder.andWhere(
        `(UPPER(name) like UPPER('%${request.querySearch}%') OR UPPER(description) like UPPER('%${request.querySearch}%'))`,
      );
    }
    // response
    return paginate<LugarOrm>(queryBuilder, request);
  }
}

export class LugarPaginateRequest extends Paginate {}
