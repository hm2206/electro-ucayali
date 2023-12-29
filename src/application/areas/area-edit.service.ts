import { Area } from 'src/domain/entities/area';
import { IdentifyUUID } from 'src/domain/value-objects/identify-uuid';
import { NoneEmptyString } from 'src/domain/value-objects/none-empty-string';
import { IBaseServiceInterface } from 'src/shared/interfaces/base-service.interface';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';

export class AreaEditService implements IBaseServiceInterface {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute(request: AreaEditRequest) {
    const areaRepository = this.unitOfWork.areaRepository;
    const area = new Area();
    area.setId(request.id);
    area.setName(new NoneEmptyString(request.name));
    area.setDescription(new NoneEmptyString(request.name));
    area.setState(request.state);
    await this.unitOfWork.start();
    return areaRepository.save(area);
  }
}

export class AreaEditRequest {
  id: IdentifyUUID;
  name: string;
  description: string;
  state: boolean;
}
