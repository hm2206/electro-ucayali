import { paginate } from 'nestjs-typeorm-paginate';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';

export class NotaPaginateService {
  constructor(private unifOfWork: IUnitOfWorkInterface) {}

  async execute(params: NotaPaginateParams) {
    const { notaRepository } = this.unifOfWork;
    const queryBuilder = notaRepository
      .createQueryBuilder('n')
      .innerJoinAndSelect('n.area', 'a')
      .innerJoinAndSelect('n.lugar', 'l')
      .leftJoinAndSelect('n.motivo', 'm')
      .leftJoinAndSelect('n.situacion', 's');
    // filter querySearch
    if (params.querySearch) {
      queryBuilder.andWhere(`n.documentCrp like '%${params.querySearch}%'`);
    }

    if (params?.rangeDate) {
      queryBuilder.andWhere(
        `n.date BETWEEN '${params.rangeDate.dateStart}' AND '${params.rangeDate.dateOver}'`,
      );
    }

    if (!!params?.state) {
      queryBuilder.andWhere(`n.state = ${params.state}`);
    }
    // response
    return paginate(queryBuilder, params);
  }
}

export interface NotaPaginateParams {
  page: number;
  limit: number;
  querySearch?: string;
  state?: boolean;
  rangeDate?: {
    dateStart: string;
    dateOver: string;
  };
}
