import { Marca } from 'src/domain/entities/marca';
import { IdentifyUUID } from 'src/domain/value-objects/identify-uuid';
import { NoneEmptyString } from 'src/domain/value-objects/none-empty-string';
import { IBaseServiceInterface } from 'src/shared/interfaces/base-service.interface';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';

export class MarcaEditService implements IBaseServiceInterface {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute(request: MarcaEditRequest) {
    const marcaRepository = this.unitOfWork.marcaRepository;
    const marca = new Marca();
    marca.setId(request.id);
    marca.setName(new NoneEmptyString(request.name));
    marca.setDescription(new NoneEmptyString(request.description));
    marca.setState(request.state);
    await this.unitOfWork.start();
    return marcaRepository.save(marca);
  }
}

export class MarcaEditRequest {
  id: IdentifyUUID;
  name: string;
  description: string;
  state: boolean;
}
