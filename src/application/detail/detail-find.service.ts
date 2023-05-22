import { IBaseServiceInterface } from 'src/shared/interfaces/base-service.interface';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';

export class DetailFindService implements IBaseServiceInterface {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute(request: DetailFindRequest) {
    const detailRepository = this.unitOfWork.detailRepository;
    await this.unitOfWork.start();
    return detailRepository.findOne({ where: request });
  }
}

export interface DetailFindRequest {
  id?: string;
}
