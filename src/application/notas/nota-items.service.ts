import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';

export class NotaItemsService {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute(params: NotaItemParams) {
    const { notaRepository, itemRepository } = this.unitOfWork;
    const nota = await notaRepository.findOne({
      where: params,
    });

    if (!nota) throw new Error('No se encontró la nota');
    const queryBuilder = itemRepository
      .createQueryBuilder('i')
      .innerJoinAndSelect('i.nota', 'n')
      .innerJoinAndSelect('i.medida', 'm')
      .innerJoinAndSelect('i.producto', 'p')
      .innerJoinAndSelect('p.marca', 'ma')
      .innerJoinAndSelect('p.medida', 'me')
      .where(`n."id" = '${nota.id}'`);
    return queryBuilder.getMany();
  }
}

export interface NotaItemParams {
  id: string;
}
