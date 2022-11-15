import { Medida } from 'src/domain/entities/medida';
import { NoneEmptyString } from 'src/domain/value-objects/none-empty-string';
import { IBaseServiceInterface } from 'src/shared/interfaces/base-service.interface';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';

export class MedidaCreateService implements IBaseServiceInterface {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute(request: MedidaCreateRequest) {
    const medidaRepository = this.unitOfWork.medidaRepository;
    const medida = new Medida();
    medida.setName(request.name);
    medida.setDescription(request.description);
    await this.unitOfWork.start();
    return medidaRepository.save({
      id: medida.getId(),
      name: medida.getName(),
      description: medida.getDescription(),
    });
  }
}

export class MedidaCreateRequest {
  name: NoneEmptyString;
  description: NoneEmptyString;
}
