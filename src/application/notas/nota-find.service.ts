import { NotaEntity } from 'src/domain/entities/nota';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';

export class NotaFindService {
  constructor(private unifOfWork: IUnitOfWorkInterface) {}

  async execute(params: NotaEditParams) {
    const { notaRepository } = this.unifOfWork;
    const nota: NotaEntity = await notaRepository.findOne({ where: params });
    if (!nota) throw new Error('no se encontró la nota');
    return nota;
  }
}

export interface NotaEditParams {
  id: string;
}
