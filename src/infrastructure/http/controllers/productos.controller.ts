import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TypeormUnitOfWork } from 'src/infrastructure/database/unit-of-works/typeorm.unit-of-work';
import { ProductoCreateDto } from '../dtos/producto-create.dto';
import { ProductoCreateService } from 'src/application/productos/producto-create.service';
import { of } from 'rxjs';
import { IdentifyUUID } from 'src/domain/value-objects/identify-uuid';
import { PaginateDto } from 'src/shared/dtos/paginate.dto';
import { ProductoPaginateService } from 'src/application/productos/producto-paginate.service';
import {
  ProductoFindRequest,
  ProductoFindService,
} from 'src/application/productos/producto-find.service';
import { ProductoEditService } from 'src/application/productos/producto-edit.service';
import { ProductoEditDto } from '../dtos/producto-edit.dto';
import { ProductoDeleteService } from 'src/application/productos/producto-delete.service';
import { ProductoMasMovimientoService } from 'src/application/productos/producto-mas-movimiento.service';
import { ProductoAnualService } from 'src/application/productos/producto-anual.service';
import { ProductoAnualDto } from '../dtos/producto-anual.dto';

@ApiTags('Productos')
@Controller('productos')
export class ProductosController {
  constructor(private unitOfWork: TypeormUnitOfWork) {}

  @Get()
  async index(@Query() request: PaginateDto) {
    const service = new ProductoPaginateService(this.unitOfWork);
    const result = await this.unitOfWork.complete(() =>
      service.execute(request),
    );
    return of(result);
  }

  @Post()
  async store(@Body() request: ProductoCreateDto) {
    const service = new ProductoCreateService(this.unitOfWork);
    const result = await this.unitOfWork.complete(
      async () => await service.execute(request),
    );
    return of(result);
  }

  @Get(':id')
  async show(@Param('id', ParseUUIDPipe) id: string) {
    const service = new ProductoFindService(this.unitOfWork);
    const request = new ProductoFindRequest();
    request.id = new IdentifyUUID(id);
    const result = await this.unitOfWork.complete(() =>
      service.execute(request),
    );
    return of(result);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() request: ProductoEditDto) {
    const service = new ProductoEditService(this.unitOfWork);
    request.id = new IdentifyUUID(id);
    const result = await this.unitOfWork.complete(() =>
      service.execute(request),
    );
    return of(result);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const service = new ProductoDeleteService(this.unitOfWork);
    const result = await this.unitOfWork.complete(() => service.execute(id));
    return of(result);
  }

  @Get('resume/masMovimientos')
  async masVendido() {
    const service = new ProductoMasMovimientoService(this.unitOfWork);
    return service.execute();
  }

  @Get('resume/anual')
  async anual(@Query() query: ProductoAnualDto) {
    const service = new ProductoAnualService(this.unitOfWork);
    return service.execute(query);
  }
}
