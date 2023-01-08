import { IBaseServiceInterface } from 'src/shared/interfaces/base-service.interface';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Paginate } from 'src/shared/utils/paginate';
import { MarcaOrm } from 'src/infrastructure/database/orm/marca.orm';

export class MarcaPaginateService implements IBaseServiceInterface {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute(request: MarcaPaginateRequest): Promise<Pagination<MarcaOrm>> {
    const marcaRepository = this.unitOfWork.marcaRepository;
    const queryBuilder = marcaRepository.createQueryBuilder();
    // filters
    if (request.querySearch) {
      queryBuilder.andWhere(
        `(name like '%${request.querySearch}%' OR description like '%${request.querySearch}%')`,
      );
    }
    // response
    return paginate<MarcaOrm>(queryBuilder, request);
  }
}

export class MarcaPaginateRequest extends Paginate {}
