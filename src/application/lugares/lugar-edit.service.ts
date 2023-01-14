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
    lugar.setId(request.id);
    lugar.setName(new NoneEmptyString(request.name));
    lugar.setDescription(new NoneEmptyString(request.description));
    await this.unitOfWork.start();
    return lugarRepository.save(lugar);
  }
}

export class LugarEditRequest {
  id: IdentifyUUID;
  name: string;
  description: string;
}
