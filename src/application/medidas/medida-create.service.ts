import { Medida } from 'src/domain/entities/medida';
import { IBaseServiceInterface } from 'src/shared/interfaces/base-service.interface';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';

export class MedidaCreateService implements IBaseServiceInterface {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute(request: MedidaCreateRequest) {
    const medidaRepository = this.unitOfWork.medidaRepository;
    const medida = new Medida();
    medida.load(request);
    await this.unitOfWork.start();
    return medidaRepository.save({
      id: medida.getId(),
      name: medida.getName(),
      description: medida.getDescription(),
    });
  }
}

export class MedidaCreateRequest {
  name: string;
  description: string;
}
