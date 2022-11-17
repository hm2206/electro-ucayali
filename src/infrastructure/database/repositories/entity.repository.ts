import { Connection } from 'typeorm';
import { AreaOrm } from '../orm/area.orm';
import { LugarOrm } from '../orm/lugar.orm';
import { MarcaOrm } from '../orm/marca.orm';
import { MedidaOrm } from '../orm/medida.orm';
import { UserOrm } from '../orm/user.orm';
import { TYPEORM_CONNECTION } from '../providers/typeorm.provider';

export const MARCA_ORM = 'MARCA_ORM';
export const MEDIDA_ORM = 'MEDIDA_ORM';
export const USER_ORM = 'USER_ORM';
export const AREA_ORM = 'AREA_ORM';
export const LUGAR_ORM = 'LUGAR_ORM';

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
  {
    provide: USER_ORM,
    useFactory: (connection: Connection) => connection.getRepository(UserOrm),
    inject: [TYPEORM_CONNECTION],
  },
  {
    provide: AREA_ORM,
    useFactory: (connection: Connection) => connection.getRepository(AreaOrm),
    inject: [TYPEORM_CONNECTION],
  },
  {
    provide: LUGAR_ORM,
    useFactory: (connection: Connection) => connection.getRepository(LugarOrm),
    inject: [TYPEORM_CONNECTION],
  },
];
