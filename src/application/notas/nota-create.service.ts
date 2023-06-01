import { NotaTypeEnum } from 'src/domain/enums/nota.enum';
import { IdentifyUUID } from 'src/domain/value-objects/identify-uuid';
import { RequiredItemsException } from 'src/shared/exceptions/required-items.exception';
import { IBaseServiceInterface } from 'src/shared/interfaces/base-service.interface';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';
import { ItemCreateService } from '../items/item-create.service';
import { SecuenciaGenerarService } from '../secuencia/secuencia-generar.service';
import { DateTime } from 'luxon';

export class NotaCreateService implements IBaseServiceInterface {
  constructor(private unifOfWork: IUnitOfWorkInterface) {}

  async execute(request: NotaCreateRequest): Promise<any> {
    const { notaRepository } = this.unifOfWork;
    const secuenciaService = new SecuenciaGenerarService(this.unifOfWork);
    const year = DateTime.now().year;

    const nota = {
      ...request,
      id: new IdentifyUUID().toString(),
      code: '',
    };

    if (!request.items.length) throw new RequiredItemsException();

    const service = new ItemCreateService(this.unifOfWork);

    const items = await Promise.all(
      request.items.map((item) =>
        service.execute({
          notaId: nota.id,
          productoId: item.productoId,
          medidaId: item.medidaId,
          amount: item.amount,
        }),
      ),
    );

    // generar código
    const secuencia = await secuenciaService.execute({
      type: request.type,
      year,
    });

    nota.code = secuencia.formato;
    const data = await notaRepository.save(nota);
    return Object.assign(data, { items });
  }
}

export class NotaCreateRequest {
  date: Date;
  documentCrp: string;
  type: NotaTypeEnum;
  observation?: string;
  areaId: string;
  lugarId: string;
  motivoId?: string;
  situacionId?: string;
  items: {
    productoId: string;
    medidaId: string;
    amount: number;
  }[] = [];
}
