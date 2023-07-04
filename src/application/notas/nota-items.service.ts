import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';

export class NotaItemsService {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute(params: NotaItemParams) {
    const { notaRepository, itemRepository } = this.unitOfWork;
    const nota = await notaRepository.findOne({
      where: params,
      relations: ['producto', 'medida', 'nota'],
    });

    if (!nota) throw new Error('No se encontró la nota');
    return itemRepository.findBy({ notaId: nota.id });
  }
}

export interface NotaItemParams {
  id: string;
}
