import { Lugar } from 'src/domain/entities/lugar';
import { IdentifyUUID } from 'src/domain/value-objects/identify-uuid';
import { NoneEmptyString } from 'src/domain/value-objects/none-empty-string';
import { IBaseServiceInterface } from 'src/shared/interfaces/base-service.interface';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';

export class LugarEditService implements IBaseServiceInterface {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute(request: LugarEditRequest) {
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

export class LugarEditRequest {
  id: IdentifyUUID;
  name: NoneEmptyString;
  description: NoneEmptyString;
}
