import { Area } from 'src/domain/entities/area';
import { NoneEmptyString } from 'src/domain/value-objects/none-empty-string';
import { IBaseServiceInterface } from 'src/shared/interfaces/base-service.interface';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';

export class AreaCreateService implements IBaseServiceInterface {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute(request: AreaCreateRequest) {
    const areaRepository = this.unitOfWork.areaRepository;
    const area = new Area();
    area.setName(new NoneEmptyString(request.name));
    area.setDescription(new NoneEmptyString(request.description));
    await this.unitOfWork.start();
    return areaRepository.save(area);
  }
}

export class AreaCreateRequest {
  name: string;
  description: string;
}
