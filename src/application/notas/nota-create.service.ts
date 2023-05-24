import { NotaTypeEnum } from 'src/domain/enums/nota.enum';
import { IdentifyUUID } from 'src/domain/value-objects/identify-uuid';
import { RequiredItemsException } from 'src/shared/exceptions/required-items.exception';
import { IBaseServiceInterface } from 'src/shared/interfaces/base-service.interface';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';
import { ItemCreateService } from '../items/item-create.service';

export class NotaCreateService implements IBaseServiceInterface {
  constructor(private unifOfWork: IUnitOfWorkInterface) {}

  async execute(request: NotaCreateRequest): Promise<any> {
    const nota = {
      id: new IdentifyUUID().toString(),
      code: new IdentifyUUID().toString(),
      ...request,
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

    const notaRepository = this.unifOfWork.notaRepository;
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
  items: {
    productoId: string;
    medidaId: string;
    amount: number;
  }[] = [];
}
