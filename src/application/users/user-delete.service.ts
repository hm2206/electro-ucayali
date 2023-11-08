import { IBaseServiceInterface } from 'src/shared/interfaces/base-service.interface';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';

export class UserDeleteService implements IBaseServiceInterface {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute(id: string) {
    const { userRepository } = this.unitOfWork;
    await this.unitOfWork.start();
    const user = await userRepository.findOne({ where: { id } });
    if (!user) throw new Error('No hay regístros');
    return userRepository.delete(user);
  }
}
