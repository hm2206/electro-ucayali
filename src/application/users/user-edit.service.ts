import { User } from 'src/domain/entities/user';
import { PasswordString } from 'src/domain/value-objects/password-string';
import { IBaseServiceInterface } from 'src/shared/interfaces/base-service.interface';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';
import { UserFindRequest } from './user-find.service';
import { EmailString } from 'src/domain/value-objects/email-string';

export class UserEditService implements IBaseServiceInterface {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute(params: UserFindRequest, request: UserEditRequest) {
    const userRepository = this.unitOfWork.userRepository;
    const user = new User();
    user.setId(params.id);
    user.setEmail(request.email);
    user.setIsAdmin(request.isAdmin);
    user.setState(request.state);
    // actualizamos contraseña
    if (request.password) {
      user.setPassword(request.password);
    }
    // save user
    await this.unitOfWork.start();
    return userRepository.save(user);
  }
}

export interface UserEditRequest {
  email: EmailString;
  password?: PasswordString;
  isAdmin: boolean;
  state: boolean;
}
