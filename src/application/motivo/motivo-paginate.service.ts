import { IBaseServiceInterface } from 'src/shared/interfaces/base-service.interface';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Paginate } from 'src/shared/utils/paginate';
import { MotivoOrm } from 'src/infrastructure/database/orm/motivo.orm';

export class MotivoPaginateService implements IBaseServiceInterface {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute(
    request: MotivoPaginateRequest,
  ): Promise<Pagination<MotivoOrm>> {
    const { motivoRepository } = this.unitOfWork;
    const queryBuilder = motivoRepository.createQueryBuilder();
    // filters
    if (request.querySearch) {
      queryBuilder.andWhere(
        `(UPPER(name) like UPPER('%${request.querySearch}%') OR UPPER(description) like UPPER('%${request.querySearch}%'))`,
      );
    }

    if (typeof request.state == 'boolean') {
      queryBuilder.andWhere(`state = ${request.state}`);
    }
    // response
    return paginate<MotivoOrm>(queryBuilder, request);
  }
}

export class MotivoPaginateRequest extends Paginate {
  state?: boolean;
}
