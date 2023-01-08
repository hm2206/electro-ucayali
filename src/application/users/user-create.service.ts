import { User } from 'src/domain/entities/user';
import { PasswordString } from 'src/domain/value-objects/password-string';
import { IBaseServiceInterface } from 'src/shared/interfaces/base-service.interface';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';

export class UserCreateService implements IBaseServiceInterface {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute(request: UserCreateRequest) {
    const userRepository = this.unitOfWork.userRepository;
    const user = new User();
    user.load(request);
    user.setPassword(new PasswordString(request.password));
    user.enabled();
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

export class UserCreateRequest {
  email: string;
  password: string;
  isAdmin: boolean;
}
