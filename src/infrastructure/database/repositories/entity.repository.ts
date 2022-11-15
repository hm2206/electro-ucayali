import { Connection } from 'typeorm';
import { MarcaOrm } from '../orm/marca.orm';
import { MedidaOrm } from '../orm/medida.orm';
import { TYPEORM_CONNECTION } from '../providers/typeorm.provider';

export const MARCA_ORM = 'MARCA_ORM';
export const MEDIDA_ORM = 'MEDIDA_ORM';

export const entitiesRepositories = [
  {
    provide: MARCA_ORM,
    useFactory: (connection: Connection) => connection.getRepository(MarcaOrm),
    inject: [TYPEORM_CONNECTION],
  },
  {
    provide: MEDIDA_ORM,
    useFactory: (connection: Connection) => connection.getRepository(MedidaOrm),
    inject: [TYPEORM_CONNECTION],
  },
];
