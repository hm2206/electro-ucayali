import { SecuenciaEntity } from 'src/domain/entities/secuencia';
import { NotaTypeEnum } from 'src/domain/enums/nota.enum';
import { IdentifyUUID } from 'src/domain/value-objects/identify-uuid';
import { IBaseServiceInterface } from 'src/shared/interfaces/base-service.interface';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';

export class SecuenciaGenerarService implements IBaseServiceInterface {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute({
    year,
    type,
  }: SecuenciaGenerarRequest): Promise<SecuenciaEntity> {
    const { secuenciaRepository } = this.unitOfWork;
    // varificar si existe
    const secuencia = await secuenciaRepository.findOne({
      where: { year, type },
    });

    if (!secuencia) {
      return secuenciaRepository.save({
        id: new IdentifyUUID().toString(),
        year,
        type,
        current: 1,
        formato: `${'0'.repeat(9)}1`,
      });
    }

    secuencia.current = secuencia.current + 1;
    const ceros = 10 - secuencia.current.length;
    secuencia.formato = `${'0'.repeat(ceros)}${secuencia.current}`;
    await secuenciaRepository.save(secuencia);
    return secuencia;
  }
}

export class SecuenciaGenerarRequest {
  year: number;
  type: NotaTypeEnum;
}
