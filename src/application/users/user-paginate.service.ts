import { IBaseServiceInterface } from 'src/shared/interfaces/base-service.interface';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Paginate } from 'src/shared/utils/paginate';
import { UserOrm } from 'src/infrastructure/database/orm/user.orm';

export class UserPaginateService implements IBaseServiceInterface {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute(request: UserPaginateRequest): Promise<Pagination<UserOrm>> {
    const userRepository = this.unitOfWork.userRepository;
    const queryBuilder = userRepository.createQueryBuilder();
    return paginate<UserOrm>(queryBuilder, request);
  }
}

export class UserPaginateRequest extends Paginate {}
