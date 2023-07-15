import { NotaEntity } from 'src/domain/entities/nota';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';
import { ItemCreateService } from '../items/item-create.service';

export class NotaAddItemService {
  constructor(private unifOfWork: IUnitOfWorkInterface) {}

  async execute(params: NotaAddItemParams, payload: NotaAddItemPayload) {
    const { notaRepository } = this.unifOfWork;
    const nota: NotaEntity = await notaRepository.findOne({ where: params });
    if (!nota) throw new Error('no se encontró la nota');
    const service = new ItemCreateService(this.unifOfWork);
    return service.execute({
      notaId: nota.id,
      productoId: payload.productoId,
      medidaId: payload.medidaId,
      amount: payload.amount,
    });
  }
}

export interface NotaAddItemParams {
  id: string;
}

export interface NotaAddItemPayload {
  productoId: string;
  medidaId: string;
  amount: number;
}
