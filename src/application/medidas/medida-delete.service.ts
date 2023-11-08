import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';

export class MedidaDeleteService {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute(id: string) {
    const medidaRepository = this.unitOfWork.medidaRepository;
    const medida = await medidaRepository.findOne({ where: { id } });
    if (!medida) throw new Error('El regístro no existe!');
    return medidaRepository.delete(medida.id);
  }
}
