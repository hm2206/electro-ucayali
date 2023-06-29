import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { of } from 'rxjs';
import { NotaCreateService } from 'src/application/notas/nota-create.service';
import { TypeormUnitOfWork } from 'src/infrastructure/database/unit-of-works/typeorm.unit-of-work';
import { NotaCreateDto } from '../dtos/nota-create.dto';
import {
  NotaItemParams,
  NotaItemsService,
} from 'src/application/notas/nota-items.service';

@ApiTags('Notas')
@Controller('notas')
export class NotasController {
  constructor(private unitOfWork: TypeormUnitOfWork) {}

  @Post()
  async store(@Body() request: NotaCreateDto) {
    const service = new NotaCreateService(this.unitOfWork);
    const result = await this.unitOfWork.complete(
      async () => await service.execute(request),
    );
    return of(result);
  }

  @Get(':id/items')
  async items(@Param() params: NotaItemParams) {
    const service = new NotaItemsService(this.unitOfWork);
    return service.execute(params);
  }
}
