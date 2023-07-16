import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';
import { IBaseServiceInterface } from 'src/shared/interfaces/base-service.interface';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';

export class MotivoFindService implements IBaseServiceInterface {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute(request: MotivoFindRequest): Promise<any> {
    const { motivoRepository } = this.unitOfWork;
    return motivoRepository.findOneOrFail({ where: request });
  }
}

export class MotivoFindRequest {
  @ApiProperty()
  @IsDefined()
  id: string;
}
