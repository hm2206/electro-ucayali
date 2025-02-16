import { IBaseServiceInterface } from 'src/shared/interfaces/base-service.interface';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Paginate } from 'src/shared/utils/paginate';
import { MedidaOrm } from 'src/infrastructure/database/orm/medida.orm';

export class MedidaPaginateService implements IBaseServiceInterface {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute(
    request: MedidaPaginateRequest,
  ): Promise<Pagination<MedidaOrm>> {
    const medidaRepository = this.unitOfWork.medidaRepository;
    const queryBuilder = medidaRepository.createQueryBuilder();
    // filter
    if (request.querySearch) {
      queryBuilder.andWhere(
        `(UPPER(name) like UPPER('%${request.querySearch}%') OR UPPER(description) like UPPER('%${request.querySearch}%'))`,
      );
    }

    if (typeof request.state == 'boolean') {
      queryBuilder.andWhere(`state = ${request.state}`);
    }
    // response
    return paginate<MedidaOrm>(queryBuilder, request);
  }
}

export class MedidaPaginateRequest extends Paginate {
  state?: boolean;
}
