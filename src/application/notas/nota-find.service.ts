import { NotaEntity } from 'src/domain/entities/nota';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';

export class NotaFindService {
  constructor(private unifOfWork: IUnitOfWorkInterface) {}

  async execute(params: NotaEditParams) {
    const { notaRepository } = this.unifOfWork;
    const queryBuilder = notaRepository
      .createQueryBuilder('n')
      .innerJoinAndSelect('n.area', 'a')
      .innerJoinAndSelect('n.lugar', 'l')
      .leftJoinAndSelect('n.motivo', 'm')
      .leftJoinAndSelect('n.situacion', 's');
    // filters
    if (params.id) queryBuilder.andWhere(`n.id = '${params.id}'`);
    const nota: NotaEntity = await queryBuilder.getOne();
    if (!nota) throw new Error('no se encontró la nota');
    return nota;
  }
}

export interface NotaEditParams {
  id: string;
}
