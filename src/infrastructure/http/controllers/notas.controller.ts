import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { of } from 'rxjs';
import { NotaCreateService } from 'src/application/notas/nota-create.service';
import { TypeormUnitOfWork } from 'src/infrastructure/database/unit-of-works/typeorm.unit-of-work';
import { NotaCreateDto } from '../dtos/nota-create.dto';
import {
  NotaItemParams,
  NotaItemsService,
} from 'src/application/notas/nota-items.service';
import {
  NotaEditParams,
  NotaEditService,
} from 'src/application/notas/nota-edit.service';
import { NotaFindService } from 'src/application/notas/nota-find.service';
import { NotaEditDto } from '../dtos/nota-edit.dto';
import { NotaPaginateService } from 'src/application/notas/nota-paginate.service';
import { NotaPaginateDto } from '../dtos/nota-paginate.dto';

@ApiTags('Notas')
@Controller('notas')
export class NotasController {
  constructor(private unitOfWork: TypeormUnitOfWork) {}

  @Get()
  async index(@Query() params: NotaPaginateDto) {
    const service = new NotaPaginateService(this.unitOfWork);
    return service.execute(params);
  }

  @Post()
  async store(@Body() request: NotaCreateDto) {
    const service = new NotaCreateService(this.unitOfWork);
    const result = await this.unitOfWork.complete(
      async () => await service.execute(request),
    );
    return of(result);
  }

  @Get(':id')
  async show(@Param() params: NotaEditParams) {
    const service = new NotaFindService(this.unitOfWork);
    return service.execute(params);
  }

  @Put(':id')
  async update(@Param() params: NotaEditParams, @Body() payload: NotaEditDto) {
    const service = new NotaEditService(this.unitOfWork);
    return service.execute(params, payload);
  }

  @Get(':id/items')
  async items(@Param() params: NotaItemParams) {
    const service = new NotaItemsService(this.unitOfWork);
    return service.execute(params);
  }
}
