import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';

export class MarcaDeleteService {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute(id: string) {
    const marcaRepository = this.unitOfWork.marcaRepository;
    const marca = await marcaRepository.findOne({ where: { id } });
    if (!marca) throw new Error('El regístro no existe!');
    return marcaRepository.delete(marca.id);
  }
}
