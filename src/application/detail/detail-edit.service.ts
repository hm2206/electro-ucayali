import { IBaseServiceInterface } from 'src/shared/interfaces/base-service.interface';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';
import { DetailFindRequest } from './detail-find.service';

export class DetailEditService implements IBaseServiceInterface {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute(params: DetailFindRequest, request: DetailEditRequest) {
    const detailRepository = this.unitOfWork.detailRepository;
    await this.unitOfWork.start();
    const detail = await detailRepository.findOne({ where: params });
    if (!detail) throw new Error('No se encontró el detalle');
    detail.serie = request.serie;
    detail.potencia = request.potencia;
    detail.year = request.year;
    return detailRepository.save(detail);
  }
}

export interface DetailEditRequest {
  serie: string;
  potencia: string;
  year: number;
}
