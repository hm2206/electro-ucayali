import { NotaTypeEnum } from 'src/domain/enums/nota.enum';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';

export class ProductoAnualService {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute(params: ProductoAnualRequest) {
    const header = await this.queryBase(params)
      .select('pro.id, pro.name')
      .addSelect('SUM(it.amount)', 'amount')
      .groupBy('pro.id, pro.name')
      .orderBy('amount', 'DESC')
      .addOrderBy('pro.name', 'ASC')
      .limit(5)
      .getRawMany();

    const ids = header.map((head) => head.id);

    if (!ids.length) return [];

    const body = await this.queryBase(params)
      .andWhere(`pro.id IN ('${ids.join("', '")}')`)
      .select(`pro.id as id`)
      .addSelect("DATE_PART('Year', n.date)", 'year')
      .addSelect("DATE_PART('Month', n.date)", 'month')
      .addSelect('SUM(it.amount)', 'amount')
      .groupBy(`pro.id`)
      .addGroupBy(`DATE_PART('Year', n.date)`)
      .addGroupBy(`DATE_PART('Month', n.date)`)
      .orderBy('"year"', 'ASC')
      .addOrderBy('"month"', 'ASC')
      .getRawMany();

    return header.map((head) => {
      head.data = body.filter((b) => b.id === head.id);
      return head;
    });
  }

  private queryBase(params: ProductoAnualRequest) {
    const { productoRepository } = this.unitOfWork;
    const queryBuilder = productoRepository
      .createQueryBuilder('pro')
      .innerJoin('pro.items', 'it')
      .innerJoin('pro.marca', 'mar')
      .innerJoin('pro.medida', 'med')
      .innerJoin('it.nota', 'n')
      .where(`pro.potencia <> ''`);

    if (params.year) {
      queryBuilder.andWhere(`DATE_PART('Year', n.date) = ${params.year}`);
    }

    if (params.type) {
      queryBuilder.andWhere(`n."type" = '${params.type}'`);
    }

    return queryBuilder;
  }
}

export interface ProductoAnualRequest {
  year?: number;
  type?: NotaTypeEnum;
}
