import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';

export class LugarDeleteService {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute(id: string) {
    const lugarRepository = this.unitOfWork.lugarRepository;
    const lugar = await lugarRepository.findOne({ where: { id } });
    if (!lugar) throw new Error('El regístro no existe!');
    return lugarRepository.delete(lugar.id);
  }
}
