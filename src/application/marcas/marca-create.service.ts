import { Marca } from 'src/domain/entities/marca';
import { NoneEmptyString } from 'src/domain/value-objects/none-empty-string';
import { IBaseServiceInterface } from 'src/shared/interfaces/base-service.interface';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';

export class MarcaCreateService implements IBaseServiceInterface {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute(request: MarcaCreateRequest) {
    const marcaRepository = this.unitOfWork.marcaRepository;
    const marca = new Marca();
    marca.setName(request.name);
    marca.setDescription(request.description);
    await this.unitOfWork.start();
    return marcaRepository.save({
      id: marca.getId(),
      name: marca.getName(),
      description: marca.getDescription(),
    });
  }
}

export class MarcaCreateRequest {
  name: NoneEmptyString;
  description: NoneEmptyString;
}
