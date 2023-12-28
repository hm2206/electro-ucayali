import { NotaTypeEnum } from '../enums/nota.enum';
import { Area } from './area';
import { Lugar } from './lugar';

export interface NotaEntity {
  id: string;
  code: string;
  date: Date;
  documentCrp?: string;
  type: NotaTypeEnum;
  observation?: string;
  area: Area;
  lugar: Lugar;
  motivoId?: string;
  situacionId?: string;
  state: boolean;
}
