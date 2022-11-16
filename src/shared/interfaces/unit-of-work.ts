import { Repository } from 'typeorm';

export interface IUnitOfWorkInterface {
  medidaRepository: Repository<any>;
  marcaRepository: Repository<any>;
  userRepository: Repository<any>;
  start(): Promise<void>;
  complete(cb: () => any): Promise<any>;
  getRepository(repository: any): Repository<any>;
}
