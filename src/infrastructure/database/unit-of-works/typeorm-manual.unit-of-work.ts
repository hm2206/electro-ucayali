import { Inject, Injectable, Logger } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';
import { Connection, EntityManager, ObjectType, Repository } from 'typeorm';
import { AreaOrm } from '../orm/area.orm';
import { DetalleOrm } from '../orm/detalle.orm';
import { ItemOrm } from '../orm/item.orm';
import { LugarOrm } from '../orm/lugar.orm';
import { MarcaOrm } from '../orm/marca.orm';
import { MedidaOrm } from '../orm/medida.orm';
import { MotivoOrm } from '../orm/motivo.orm';
import { NotaOrm } from '../orm/nota.orm';
import { ProductoOrm } from '../orm/producto.orm';
import { SecuenciaOrm } from '../orm/secuencia.orm';
import { SituacionOrm } from '../orm/situacion.orm';
import { UserOrm } from '../orm/user.orm';
import { TYPEORM_CONNECTION } from '../providers/typeorm.provider';

@Injectable()
export class TypeormManualUnitOfWork implements IUnitOfWorkInterface {
  private logger = new Logger(TypeormManualUnitOfWork.name);
  public medidaRepository: Repository<MedidaOrm>;
  public marcaRepository: Repository<MarcaOrm>;
  public userRepository: Repository<UserOrm>;
  public areaRepository: Repository<AreaOrm>;
  public lugarRepository: Repository<LugarOrm>;
  public notaRepository: Repository<NotaOrm>;
  public itemRepository: Repository<ItemOrm>;
  public productoRepository: Repository<ProductoOrm>;
  public detailRepository: Repository<DetalleOrm>;
  public motivoRepository: Repository<MotivoOrm>;
  public situacionRepository: Repository<SituacionOrm>;
  public secuenciaRepository: Repository<SecuenciaOrm>;

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
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    this.notaRepository = queryRunner.manager.getRepository(NotaOrm);
    this.itemRepository = queryRunner.manager.getRepository(ItemOrm);
    this.secuenciaRepository = queryRunner.manager.getRepository(SecuenciaOrm);

    try {
      let response: any;
      await this.asyncLocalStorage.run(
        new Map<string, EntityManager>(),
        async () => {
          this.asyncLocalStorage
            .getStore()
            .set('typeOrmEntityManager', queryRunner.manager);
          response = await work(queryRunner.manager);
        },
      );
      await queryRunner.commitTransaction();
      // response
      return response;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
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
    this.motivoRepository = this.getManager().getRepository(MotivoOrm);
    this.situacionRepository = this.getManager().getRepository(SituacionOrm);
    this.secuenciaRepository = this.getManager().getRepository(SecuenciaOrm);
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
