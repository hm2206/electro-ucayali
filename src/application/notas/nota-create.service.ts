import { Area } from 'src/domain/entities/area';
import { Lugar } from 'src/domain/entities/lugar';
import { Nota } from 'src/domain/entities/nota';
import { NotaTypeEnum } from 'src/domain/enums/nota.enum';
import { IdentifyUUID } from 'src/domain/value-objects/identify-uuid';
import { RequiredItemsException } from 'src/shared/exceptions/required-items.exception';
import { IBaseServiceInterface } from 'src/shared/interfaces/base-service.interface';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';
import {
  ItemCreateRequest,
  ItemCreateService,
} from '../items/item-create.service';

export class NotaCreateService implements IBaseServiceInterface {
  constructor(private unifOfWork: IUnitOfWorkInterface) {}

  async execute(request: NotaCreateRequest): Promise<any> {
    const area = new Area();
    area.setId(new IdentifyUUID(request.areaId));

    const lugar = new Lugar();
    lugar.setId(new IdentifyUUID(request.lugarId));

    const nota = new Nota();
    nota.load(request);
    nota.setArea(area);
    nota.setLugar(lugar);

    if (!request.items.length) throw new RequiredItemsException();

    const service = new ItemCreateService(this.unifOfWork);
    request.items.forEach(async (itemRequest) => {
      const item = await service.execute(itemRequest);
      nota.addItem(item);
    });

    const notaRepository = this.unifOfWork.notaRepository;
    return notaRepository.save({
      id: nota.getId(),
      code: nota.getCode(),
      date: nota.getDate(),
      documentCrp: nota.getDocumentCrp(),
      type: nota.getType(),
      areaId: nota.getArea().getId(),
      lugarId: nota.getLugar().getId(),
      observation: nota.getObservation(),
    });
  }
}

export class NotaCreateRequest {
  code: string;
  date: Date;
  documentCrp: string;
  type: NotaTypeEnum;
  observation?: string;
  areaId: string;
  lugarId: string;
  items: ItemCreateRequest[] = [];
}
