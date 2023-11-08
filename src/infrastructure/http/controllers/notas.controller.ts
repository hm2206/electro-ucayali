import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  StreamableFile,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { of } from 'rxjs';
import { NotaAddItemService } from 'src/application/notas/nota-add-item.service';
import { NotaCreateService } from 'src/application/notas/nota-create.service';
import {
  NotaEditParams,
  NotaEditService,
} from 'src/application/notas/nota-edit.service';
import { NotaFindService } from 'src/application/notas/nota-find.service';
import {
  NotaItemParams,
  NotaItemsService,
} from 'src/application/notas/nota-items.service';
import { NotaPaginateService } from 'src/application/notas/nota-paginate.service';
import { TypeormManualUnitOfWork } from 'src/infrastructure/database/unit-of-works/typeorm-manual.unit-of-work';
import { TypeormUnitOfWork } from 'src/infrastructure/database/unit-of-works/typeorm.unit-of-work';
import { NotaInformeReport } from 'src/infrastructure/reports/nota-informe.report';
import { NotaAddItemDto } from '../dtos/nota-add-item.dto';
import { NotaCreateDto } from '../dtos/nota-create.dto';
import { NotaEditDto } from '../dtos/nota-edit.dto';
import { NotaPaginateDto } from '../dtos/nota-paginate.dto';
import { NotaDeleteService } from 'src/application/notas/nota-delete.service';

@ApiTags('Notas')
@Controller('notas')
export class NotasController {
  constructor(
    private unitOfWork: TypeormUnitOfWork,
    private unitOfWorkManual: TypeormManualUnitOfWork,
  ) {}

  @Get()
  async index(@Query() params: NotaPaginateDto) {
    console.log(params);
    const service = new NotaPaginateService(this.unitOfWork);
    return service.execute(params);
  }

  @Post()
  async store(@Body() request: NotaCreateDto) {
    const service = new NotaCreateService(this.unitOfWorkManual);
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

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const service = new NotaDeleteService(this.unitOfWork);
    const result = await this.unitOfWork.complete(() => service.execute(id));
    return of(result);
  }

  @Get(':id/items')
  async items(@Param() params: NotaItemParams) {
    const service = new NotaItemsService(this.unitOfWork);
    return service.execute(params);
  }

  @Post(':id/items')
  async addItems(
    @Param() params: NotaItemParams,
    @Body() payload: NotaAddItemDto,
  ) {
    const service = new NotaAddItemService(this.unitOfWork);
    return service.execute(params, payload);
  }

  @Get(':id/informe.pdf')
  async reportInforme(@Param() params: NotaEditParams) {
    const report = new NotaInformeReport(this.unitOfWork);
    const buffer = await report.execute(params);
    return new StreamableFile(buffer, {
      type: 'application/pdf',
    });
  }
}
