import { IBaseServiceInterface } from 'src/shared/interfaces/base-service.interface';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';

export class ItemDeleteService implements IBaseServiceInterface {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute(request: ItemDeleteRequest) {
    try {
      const itemRepostitory = this.unitOfWork.itemRepository;
      const item = await itemRepostitory.findOne({
        where: request,
      });
      if (!item) throw new Error('No se encontró el item');
      await itemRepostitory.delete(item.id);
      return { deleted: true };
    } catch (error) {
      throw new Error('No se pudo guardar');
    }
  }
}

export class ItemDeleteRequest {
  id: string;
}
