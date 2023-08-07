import { NotaEntity } from 'src/domain/entities/nota';
import { NotaTypeEnum } from 'src/domain/enums/nota.enum';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';
import { ItemCreateService } from '../items/item-create.service';

export class NotaAddItemService {
  constructor(private unifOfWork: IUnitOfWorkInterface) { }

  async execute(params: NotaAddItemParams, payload: NotaAddItemPayload) {
    const { notaRepository } = this.unifOfWork;
    const nota: NotaEntity = await notaRepository.findOne({ where: params });
    if (!nota) throw new Error('no se encontró la nota');
    const service = new ItemCreateService(this.unifOfWork);
    return service.execute({
      isValid: nota.type == NotaTypeEnum.EXIT,
      notaId: nota.id,
      productoId: payload.productoId,
      amount: payload.amount,
    });
  }
}

export interface NotaAddItemParams {
  id: string;
}

export interface NotaAddItemPayload {
  productoId: string;
  amount: number;
}
