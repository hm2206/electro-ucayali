import { Inject, Injectable, Logger } from '@nestjs/common';
import { EntityManager, Repository, ObjectType, Connection } from 'typeorm';
import { AsyncLocalStorage } from 'async_hooks';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';
import { TYPEORM_CONNECTION } from '../providers/typeorm.provider';
import { MedidaOrm } from '../orm/medida.orm';
import { MarcaOrm } from '../orm/marca.orm';
import { UserOrm } from '../orm/user.orm';
import { AreaOrm } from '../orm/area.orm';
import { LugarOrm } from '../orm/lugar.orm';
import { NotaOrm } from '../orm/nota.orm';
import { ItemOrm } from '../orm/item.orm';
import { ProductoOrm } from '../orm/producto.orm';
import { DetalleOrm } from '../orm/detalle.orm';

@Injectable()
export class TypeormUnitOfWork implements IUnitOfWorkInterface {
  private logger = new Logger(TypeormUnitOfWork.name);
  public medidaRepository: Repository<MedidaOrm>;
  public marcaRepository: Repository<MarcaOrm>;
  public userRepository: Repository<UserOrm>;
  public areaRepository: Repository<AreaOrm>;
  public lugarRepository: Repository<LugarOrm>;
  public notaRepository: Repository<NotaOrm>;
  public itemRepository: Repository<ItemOrm>;
  public productoRepository: Repository<ProductoOrm>;
  public detailRepository: Repository<DetalleOrm>;

  constructor(
    @Inject(TYPEORM_CONNECTION)
    private readonly connection: Connection,
  ) {
    this.asyncLocalStorage = new AsyncLocalStorage();
    this.initRepositories();
  }

  private readonly asyncLocalStorage: AsyncLocalStorage<any>;

  async start(): Promise<void> {
    this.logger.log('start transaction');
  }

  async complete(work: (currentManager: EntityManager) => any): Promise<any> {
    try {
      return await this.connection.transaction(async (manager) => {
        let response: any;
        await this.asyncLocalStorage.run(
          new Map<string, EntityManager>(),
          async () => {
            this.asyncLocalStorage
              .getStore()
              .set('typeOrmEntityManager', manager);
            response = await work(manager);
          },
        );
        // response
        return response;
      });
    } catch (error) {
      this.logger.error(`rollback => ${error.message}`);
      throw new Error(error);
    }
  }

  async close(): Promise<void> {
    this.connection.close();
  }

  initRepositories() {
    this.medidaRepository = this.getManager().getRepository(MedidaOrm);
    this.marcaRepository = this.getManager().getRepository(MarcaOrm);
    this.userRepository = this.getManager().getRepository(UserOrm);
    this.areaRepository = this.getManager().getRepository(AreaOrm);
    this.lugarRepository = this.getManager().getRepository(LugarOrm);
    this.notaRepository = this.getManager().getRepository(NotaOrm);
    this.itemRepository = this.getManager().getRepository(ItemOrm);
    this.productoRepository = this.getManager().getRepository(ProductoOrm);
    this.detailRepository = this.getManager().getRepository(DetalleOrm);
  }

  getManager(): EntityManager {
    const storage = this.asyncLocalStorage.getStore();
    if (storage && storage.has('typeOrmEntityManager')) {
      return this.asyncLocalStorage.getStore().get('typeOrmEntityManager');
    }
    return this.connection.createEntityManager();
  }

  getRepository(repository: ObjectType<Repository<any>>): Repository<any> {
    return this.getManager().getRepository(repository);
  }
}
