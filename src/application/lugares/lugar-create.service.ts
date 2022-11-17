import { Lugar } from 'src/domain/entities/lugar';
import { NoneEmptyString } from 'src/domain/value-objects/none-empty-string';
import { IBaseServiceInterface } from 'src/shared/interfaces/base-service.interface';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';

export class LugarCreateService implements IBaseServiceInterface {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute(request: LugarCreateRequest) {
    const lugarRepository = this.unitOfWork.lugarRepository;
    const lugar = new Lugar();
    lugar.load(request);
    await this.unitOfWork.start();
    return lugarRepository.save({
      id: lugar.getId(),
      name: lugar.getName(),
      description: lugar.getDescription(),
    });
  }
}

export class LugarCreateRequest {
  name: NoneEmptyString;
  description: NoneEmptyString;
}
