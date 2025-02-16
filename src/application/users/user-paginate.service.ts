import { IBaseServiceInterface } from 'src/shared/interfaces/base-service.interface';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { UserOrm } from 'src/infrastructure/database/orm/user.orm';
import { PaginateRequestInterface } from 'src/shared/interfaces/paginate-request.interface';
import { OrderRequestInterface } from 'src/shared/interfaces/order-request.interface';

export class UserPaginateService implements IBaseServiceInterface {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute(request: UserPaginateRequest): Promise<Pagination<UserOrm>> {
    const userRepository = this.unitOfWork.userRepository;
    const queryBuilder = userRepository.createQueryBuilder();
    // filters
    if (request.querySearch) {
      queryBuilder.andWhere(`email like '%${request.querySearch}%'`);
    }

    if (typeof request.state == 'boolean') {
      queryBuilder.andWhere(`state = ${request.state}`);
    }
    // response
    return paginate<UserOrm>(queryBuilder, request);
  }
}

export interface UserPaginateRequest extends PaginateRequestInterface {
  state?: boolean;
  orders?: OrderRequestInterface<'email' | 'state'>[];
}
