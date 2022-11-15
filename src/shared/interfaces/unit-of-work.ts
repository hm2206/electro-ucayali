import { MedidaOrm } from 'src/infrastructure/database/orm/medida.orm';
import { Repository } from 'typeorm';

export interface IUnitOfWorkInterface {
  medidaRepository: Repository<any>;
  start(): Promise<void>;
  complete(cb: () => any): Promise<any>;
  getRepository(repository: any): Repository<any>;
}
