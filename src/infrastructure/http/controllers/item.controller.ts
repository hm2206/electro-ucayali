import { Controller, Delete, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { of } from 'rxjs';
import {
  ItemDeleteRequest,
  ItemDeleteService,
} from 'src/application/items/item-delete.service';
import { TypeormUnitOfWork } from 'src/infrastructure/database/unit-of-works/typeorm.unit-of-work';

@ApiTags('items')
@Controller('items')
export class ItemController {
  constructor(private unitOfWork: TypeormUnitOfWork) {}

  @Delete(':id')
  async delete(@Param() params: ItemDeleteRequest) {
    const service = new ItemDeleteService(this.unitOfWork);
    const result = await this.unitOfWork.complete(() =>
      service.execute(params),
    );
    return of(result);
  }
}
