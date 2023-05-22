import { IBaseServiceInterface } from 'src/shared/interfaces/base-service.interface';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';

export class DetailCreateService implements IBaseServiceInterface {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute(request: DetailCreateRequest) {
    const detailRepository = this.unitOfWork.detailRepository;
    await this.unitOfWork.start();
    return detailRepository.save(request);
  }
}

export interface DetailCreateRequest {
  productId: string;
  serie: string;
  potencia: string;
  year: number;
}
