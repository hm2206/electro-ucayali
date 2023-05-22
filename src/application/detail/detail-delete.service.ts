import { IBaseServiceInterface } from 'src/shared/interfaces/base-service.interface';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';
import { DetailFindRequest } from './detail-find.service';

export class DetailDeleteService implements IBaseServiceInterface {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute(params: DetailFindRequest) {
    const detailRepository = this.unitOfWork.detailRepository;
    await this.unitOfWork.start();
    const detail = await detailRepository.findOne({ where: params });
    if (!detail) throw new Error('No se encontró el detalle');
    return detailRepository.delete(detail);
  }
}
