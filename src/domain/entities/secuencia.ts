import { NotaTypeEnum } from '../enums/nota.enum';

export interface SecuenciaEntity {
  id: string;
  type: NotaTypeEnum;
  year: number;
  current: number;
  formato: string;
}
