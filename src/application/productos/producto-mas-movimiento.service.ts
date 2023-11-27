import { NotaTypeEnum } from 'src/domain/enums/nota.enum';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';

export class ProductoMasMovimientoService {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute() {
    const entrySql = this.queryCounter(NotaTypeEnum.ENTRY);
    const exitSql = this.queryCounter(NotaTypeEnum.EXIT);
    return this.query(entrySql, exitSql);
  }

  private query(entrySql: string, exitSql: string) {
    const { productoRepository } = this.unitOfWork;
    const attributes = [
      'pro.id',
      'pro.code',
      'pro."codePatrimonial"',
      'pro.serie',
      'pro.potencia',
      'pro.year',
      'pro.name',
      'pro.description',
      'pro.stock',
    ];

    return productoRepository
      .createQueryBuilder('pro')
      .innerJoin('pro.marca', 'mar')
      .innerJoin('pro.medida', 'med')
      .innerJoin('pro.items', 'it')
      .select(attributes.join(', '))
      .addSelect('mar.name', 'marca')
      .addSelect('med.name', 'medida')
      .addSelect(`SUM(it.amount)`, 'amount')
      .addSelect(`(${entrySql})`, `amountEntry`)
      .addSelect(`(${exitSql})`, `amountExit`)
      .groupBy([...attributes, 'mar.name', 'med.name'].join(','))
      .orderBy(`amount`, 'DESC')
      .limit(10)
      .getRawMany();
  }

  private queryCounter(type: NotaTypeEnum) {
    const { productoRepository } = this.unitOfWork;
    return productoRepository
      .createQueryBuilder('c_pro')
      .innerJoin('c_pro.items', 'c_it')
      .innerJoin('c_it.nota', 'c_n')
      .where(`c_n."type" = '${type}'`)
      .andWhere(`c_pro.id = pro.id`)
      .select('COALESCE(SUM(c_it.amount), 0)', 'amount')
      .getSql();
  }
}
