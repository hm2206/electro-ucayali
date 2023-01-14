import { Lugar } from 'src/domain/entities/lugar';
import { NoneEmptyString } from 'src/domain/value-objects/none-empty-string';
import { IBaseServiceInterface } from 'src/shared/interfaces/base-service.interface';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';

export class LugarCreateService implements IBaseServiceInterface {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute(request: LugarCreateRequest) {
    const lugarRepository = this.unitOfWork.lugarRepository;
    const lugar = new Lugar();
    lugar.setName(new NoneEmptyString(request.name));
    lugar.setDescription(new NoneEmptyString(request.description));
    await this.unitOfWork.start();
    return lugarRepository.save(lugar);
  }
}

export class LugarCreateRequest {
  name: string;
  description: string;
}
