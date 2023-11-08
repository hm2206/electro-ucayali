import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';

export class AreaDeleteService {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute(id: string) {
    const areaRepository = this.unitOfWork.areaRepository;
    const area = await areaRepository.findOne({ where: { id } });
    if (!area) throw new Error('El regístro no existe!');
    return areaRepository.delete(area.id);
  }
}
