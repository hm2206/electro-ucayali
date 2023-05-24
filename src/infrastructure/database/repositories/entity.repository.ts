import { Connection } from 'typeorm';
import { AreaOrm } from '../orm/area.orm';
import { ItemOrm } from '../orm/item.orm';
import { LugarOrm } from '../orm/lugar.orm';
import { MarcaOrm } from '../orm/marca.orm';
import { MedidaOrm } from '../orm/medida.orm';
import { NotaOrm } from '../orm/nota.orm';
import { ProductoOrm } from '../orm/producto.orm';
import { SerieOrm } from '../orm/serie.orm';
import { UserOrm } from '../orm/user.orm';
import { TYPEORM_CONNECTION } from '../providers/typeorm.provider';
import { DetalleOrm } from '../orm/detalle.orm';
import { MotivoOrm } from '../orm/motivo.orm';
import { SituacionOrm } from '../orm/situacion.orm';

export const MARCA_ORM = 'MARCA_ORM';
export const MEDIDA_ORM = 'MEDIDA_ORM';
export const USER_ORM = 'USER_ORM';
export const AREA_ORM = 'AREA_ORM';
export const LUGAR_ORM = 'LUGAR_ORM';
export const PRODUCTO_ORM = 'PRODUCTO_ORM';
export const NOTA_ORM = 'NOTA_ORM';
export const ITEM_ORM = 'ITEM_ORM';
export const SERIE_ORM = 'SERIE_ORM';
export const MOTIVO_ORM = 'MOTIVO_ORM';
export const SITUACION_ORM = 'SITUACION_ORM';
export const DETAIL_ORM = 'DETAIL_ORM';

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
  {
    provide: PRODUCTO_ORM,
    useFactory: (connection: Connection) =>
      connection.getRepository(ProductoOrm),
    inject: [TYPEORM_CONNECTION],
  },
  {
    provide: NOTA_ORM,
    useFactory: (connection: Connection) => connection.getRepository(NotaOrm),
    inject: [TYPEORM_CONNECTION],
  },
  {
    provide: ITEM_ORM,
    useFactory: (connection: Connection) => connection.getRepository(ItemOrm),
    inject: [TYPEORM_CONNECTION],
  },
  {
    provide: SERIE_ORM,
    useFactory: (connection: Connection) => connection.getRepository(SerieOrm),
    inject: [TYPEORM_CONNECTION],
  },
  {
    provide: DETAIL_ORM,
    useFactory: (connection: Connection) =>
      connection.getRepository(DetalleOrm),
    inject: [TYPEORM_CONNECTION],
  },
  {
    provide: MOTIVO_ORM,
    useFactory: (connection: Connection) => connection.getRepository(MotivoOrm),
    inject: [TYPEORM_CONNECTION],
  },
  {
    provide: SITUACION_ORM,
    useFactory: (connection: Connection) =>
      connection.getRepository(SituacionOrm),
    inject: [TYPEORM_CONNECTION],
  },
];
