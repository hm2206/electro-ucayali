import { NotFoundException } from '@nestjs/common';
import { IdentifyUUID } from 'src/domain/value-objects/identify-uuid';
import { IBaseServiceInterface } from 'src/shared/interfaces/base-service.interface';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';

export class UserFindService implements IBaseServiceInterface {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute({ id }: UserFindRequest): Promise<any> {
    const userRepository = this.unitOfWork.userRepository;
    const user = userRepository.findOne({ where: { id: id.getValue() } });
    if (!user) throw new NotFoundException();
    return user;
  }
}

export class UserFindRequest {
  id: IdentifyUUID;
}
