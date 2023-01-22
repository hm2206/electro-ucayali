import { Medida } from 'src/domain/entities/medida';
import { IdentifyUUID } from 'src/domain/value-objects/identify-uuid';
import { NoneEmptyString } from 'src/domain/value-objects/none-empty-string';
import { IBaseServiceInterface } from 'src/shared/interfaces/base-service.interface';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';

export class MedidaEditService implements IBaseServiceInterface {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute(request: MedidaEditRequest) {
    const medidaRepository = this.unitOfWork.medidaRepository;
    const medida = new Medida();
    medida.setId(request.id);
    medida.setName(new NoneEmptyString(request.name));
    medida.setDescription(new NoneEmptyString(request.description));
    await this.unitOfWork.start();
    return medidaRepository.save(medida);
  }
}

export class MedidaEditRequest {
  id: IdentifyUUID;
  name: string;
  description: string;
}
