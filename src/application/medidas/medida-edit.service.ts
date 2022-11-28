import { Medida } from 'src/domain/entities/medida';
import { IdentifyUUID } from 'src/domain/value-objects/identify-uuid';
import { IBaseServiceInterface } from 'src/shared/interfaces/base-service.interface';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';

export class MedidaEditService implements IBaseServiceInterface {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute(request: MedidaEditRequest) {
    const medidaRepository = this.unitOfWork.medidaRepository;
    const medida = new Medida();
    medida.load(request);
    medida.setId(request.id);
    await this.unitOfWork.start();
    return medidaRepository.save({
      id: medida.getId(),
      name: medida.getName(),
      description: medida.getDescription(),
    });
  }
}

export class MedidaEditRequest {
  id: IdentifyUUID;
  name: string;
  description: string;
}
