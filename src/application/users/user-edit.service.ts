import { User } from 'src/domain/entities/user';
import { IdentifyUUID } from 'src/domain/value-objects/identify-uuid';
import { IBaseServiceInterface } from 'src/shared/interfaces/base-service.interface';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';

export class UserEditService implements IBaseServiceInterface {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute(request: UserEditRequest) {
    const userRepository = this.unitOfWork.userRepository;
    const user = new User();
    user.load(request);
    user.setId(request.id);
    await this.unitOfWork.start();
    return userRepository.save({
      id: user.getId(),
      email: user.getEmail(),
      password: user.getPassword(),
      isAdmin: user.getIsAdmin(),
      state: user.getState(),
    });
  }
}

export class UserEditRequest {
  id: IdentifyUUID;
  email: string;
  password: string;
  isAdmin: boolean;
  state: boolean;
}
