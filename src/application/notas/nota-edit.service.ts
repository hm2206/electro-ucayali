import { NotaEntity } from 'src/domain/entities/nota';
import { NotaTypeEnum } from 'src/domain/enums/nota.enum';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';

export class NotaEditService {
  constructor(private unifOfWork: IUnitOfWorkInterface) {}

  async execute(params: NotaEditParams, payload: NotaEditPayload) {
    const { notaRepository } = this.unifOfWork;
    const nota: NotaEntity = await notaRepository.findOne({ where: params });
    if (!nota) throw new Error('no se encontró la nota');
    return notaRepository.update(nota.id, payload);
  }
}

export interface NotaEditParams {
  id: string;
}

export interface NotaEditPayload {
  date: Date;
  documentCrp?: string;
  type: NotaTypeEnum;
  observation?: string;
  areaId: string;
  lugarId: string;
  motivoId?: string;
  situacionId?: string;
}
