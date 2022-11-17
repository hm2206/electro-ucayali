import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { of } from 'rxjs';
import { MarcaCreateService } from 'src/application/marcas/marca-create.service';
import { MarcaEditService } from 'src/application/marcas/marca-edit.service';
import {
  MarcaFindRequest,
  MarcaFindService,
} from 'src/application/marcas/marca-find.service';
import { MarcaPaginateService } from 'src/application/marcas/marca-paginate.service';
import { IdentifyUUID } from 'src/domain/value-objects/identify-uuid';
import { TypeormUnitOfWork } from 'src/infrastructure/database/unit-of-works/typeorm.unit-of-work';
import { MarcaCreateDto } from '../dtos/marca-create.dto';
import { MarcaEditDto } from '../dtos/marca-edit.dto';
import { PaginateDto } from '../dtos/paginate.dto';

@Controller('marcas')
export class MarcasController {
  constructor(private unitOfWork: TypeormUnitOfWork) {}

  @Get()
  async index(@Query() request: PaginateDto) {
    const service = new MarcaPaginateService(this.unitOfWork);
    const result = await this.unitOfWork.complete(() =>
      service.execute(request),
    );
    return of(result);
  }

  @Post()
  async store(@Body() request: MarcaCreateDto) {
    const service = new MarcaCreateService(this.unitOfWork);
    const result = await this.unitOfWork.complete(() =>
      service.execute(request),
    );
    return of(result);
  }

  @Get(':id')
  async show(@Param('id', ParseUUIDPipe) id: string) {
    const service = new MarcaFindService(this.unitOfWork);
    const request = new MarcaFindRequest();
    request.id = new IdentifyUUID(id);
    const result = await this.unitOfWork.complete(() =>
      service.execute(request),
    );
    return of(result);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() request: MarcaEditDto) {
    const service = new MarcaEditService(this.unitOfWork);
    request.id = new IdentifyUUID(id);
    const result = await this.unitOfWork.complete(() =>
      service.execute(request),
    );
    return of(result);
  }
}
