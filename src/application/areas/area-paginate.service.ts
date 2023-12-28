import { IBaseServiceInterface } from 'src/shared/interfaces/base-service.interface';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Paginate } from 'src/shared/utils/paginate';
import { AreaOrm } from 'src/infrastructure/database/orm/area.orm';

export class AreaPaginateService implements IBaseServiceInterface {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute(request: AreaPaginateRequest): Promise<Pagination<AreaOrm>> {
    const areaRepository = this.unitOfWork.areaRepository;
    const queryBuilder = areaRepository.createQueryBuilder();
    // filters
    if (request.querySearch) {
      queryBuilder.andWhere(
        `(UPPER(name) like UPPER('%${request.querySearch}%') OR UPPER(description) like UPPER('%${request.querySearch}%'))`,
      );
    }
    // response
    return paginate<AreaOrm>(queryBuilder, request);
  }
}

export class AreaPaginateRequest extends Paginate {}
