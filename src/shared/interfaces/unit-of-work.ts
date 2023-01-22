import { Repository } from 'typeorm';

export interface IUnitOfWorkInterface {
  medidaRepository: Repository<any>;
  marcaRepository: Repository<any>;
  userRepository: Repository<any>;
  areaRepository: Repository<any>;
  lugarRepository: Repository<any>;
  notaRepository: Repository<any>;
  itemRepository: Repository<any>;
  productoRepository: Repository<any>;
  start(): Promise<void>;
  complete(cb: () => any): Promise<any>;
  getRepository(repository: any): Repository<any>;
}
