import { Area } from 'src/domain/entities/area';
import { IdentifyUUID } from 'src/domain/value-objects/identify-uuid';
import { IBaseServiceInterface } from 'src/shared/interfaces/base-service.interface';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';

export class AreaEditService implements IBaseServiceInterface {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute(request: AreaEditRequest) {
    const areaRepository = this.unitOfWork.areaRepository;
    const area = new Area();
    area.load(request);
    area.setId(request.id);
    await this.unitOfWork.start();
    return areaRepository.save({
      id: area.getId(),
      name: area.getName(),
      description: area.getDescription(),
    });
  }
}

export class AreaEditRequest {
  id: IdentifyUUID;
  name: string;
  description: string;
}
