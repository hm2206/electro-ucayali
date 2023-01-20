import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PasswordString } from 'src/domain/value-objects/password-string';
import { UserOrm } from 'src/infrastructure/database/orm/user.orm';
import { IBaseServiceInterface } from 'src/shared/interfaces/base-service.interface';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';

export class UserVerifyService implements IBaseServiceInterface {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute(request: UserVerifyRequest): Promise<any> {
    const userRepository = this.unitOfWork.userRepository;
    const user: UserOrm = await userRepository.findOne({
      where: { email: request.username },
    });
    // validar si existe
    if (!user) throw new NotFoundException();
    const password = new PasswordString(request.password);
    const isValid = password.compareHash(user.password);
    if (!isValid) throw new UnauthorizedException();
    return user;
  }
}

export class UserVerifyRequest {
  username: string;
  password: string;
}
