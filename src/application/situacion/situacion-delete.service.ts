import { IBaseServiceInterface } from 'src/shared/interfaces/base-service.interface';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';
import { SituacionFindRequest } from './situacion-find.service';

export class SituacionDeleteService implements IBaseServiceInterface {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute(params: SituacionFindRequest) {
    const { situacionRepository, notaRepository } = this.unitOfWork;
    await this.unitOfWork.start();
    const situacion = await situacionRepository.findOne({ where: params });
    if (!situacion) throw new Error('No se encontró la situación');
    const count = await notaRepository
      .createQueryBuilder()
      .andWhere(`"situacionId" = '${situacion.id}'`)
      .getCount();
    if (count) {
      await situacionRepository.update(situacion.id, { state: false });
      return { message: 'Registro desactivado' };
    } else {
      await situacionRepository.delete(situacion);
      return { message: 'Registro elminado' };
    }
  }
}
