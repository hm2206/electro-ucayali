import { IBaseServiceInterface } from 'src/shared/interfaces/base-service.interface';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Paginate } from 'src/shared/utils/paginate';
import { SituacionOrm } from 'src/infrastructure/database/orm/situacion.orm';

export class SituacionPaginateService implements IBaseServiceInterface {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute(
    request: SituacionPaginateRequest,
  ): Promise<Pagination<SituacionOrm>> {
    const { situacionRepository } = this.unitOfWork;
    const queryBuilder = situacionRepository.createQueryBuilder();
    // filters
    if (request.querySearch) {
      queryBuilder.andWhere(
        `(UPPER(name) like UPPER('%${request.querySearch}%') OR UPPER(description) like UPPER('%${request.querySearch}%'))`,
      );
    }
    // response
    return paginate<SituacionOrm>(queryBuilder, request);
  }
}

export class SituacionPaginateRequest extends Paginate {}
