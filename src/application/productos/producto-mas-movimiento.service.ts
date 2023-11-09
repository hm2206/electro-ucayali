import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';

export class ProductoMasMovimientoService {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute() {
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
      .innerJoin('pro.items', 'it')
      .innerJoin('pro.marca', 'mar')
      .innerJoin('pro.medida', 'med')
      .select(attributes.join(', '))
      .addSelect('COUNT(it.amount)', 'amount')
      .addSelect('mar.name', 'marca')
      .addSelect('med.name', 'medida')
      .groupBy([...attributes, 'mar.name', 'med.name'].join(','))
      .orderBy('amount', 'DESC')
      .limit(10)
      .getRawMany();
  }
}
