import { User } from 'src/domain/entities/user';
import { EmailString } from 'src/domain/value-objects/email-string';
import { IdentifyUUID } from 'src/domain/value-objects/identify-uuid';
import { PasswordString } from 'src/domain/value-objects/password-string';
import { IBaseServiceInterface } from 'src/shared/interfaces/base-service.interface';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';

export class UserEditService implements IBaseServiceInterface {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute(request: UserEditRequest) {
    const userRepository = this.unitOfWork.userRepository;
    const user = new User();
    user.setEmail(request.email);
    user.setPassword(request.password);
    user.setIsAdmin(request.isAdmin);
    user.setState(request.state);
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
  email: EmailString;
  password: PasswordString;
  isAdmin: boolean;
  state: boolean;
}
