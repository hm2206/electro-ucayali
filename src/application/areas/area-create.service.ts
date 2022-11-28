import { Area } from 'src/domain/entities/area';
import { IBaseServiceInterface } from 'src/shared/interfaces/base-service.interface';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';

export class AreaCreateService implements IBaseServiceInterface {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute(request: AreaCreateRequest) {
    const areaRepository = this.unitOfWork.areaRepository;
    const area = new Area();
    area.load(request);
    await this.unitOfWork.start();
    return areaRepository.save({
      id: area.getId(),
      name: area.getName(),
      description: area.getDescription(),
    });
  }
}

export class AreaCreateRequest {
  name: string;
  description: string;
}
