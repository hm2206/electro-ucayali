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
import { ApiTags } from '@nestjs/swagger';
import { TypeormUnitOfWork } from 'src/infrastructure/database/unit-of-works/typeorm.unit-of-work';
import { ProductoCreateDto } from '../dtos/producto-create.dto';
import { ProductoCreateService } from 'src/application/productos/producto-create.service';
import { of } from 'rxjs';
import { Medida } from 'src/domain/entities/medida';
import { IdentifyUUID } from 'src/domain/value-objects/identify-uuid';
import { Marca } from 'src/domain/entities/marca';
import { PaginateDto } from 'src/shared/dtos/paginate.dto';
import { ProductoPaginateService } from 'src/application/productos/producto-paginate.service';
import {
  ProductoFindRequest,
  ProductoFindService,
} from 'src/application/productos/producto-find.service';
import { ProductoEditService } from 'src/application/productos/producto-edit.service';
import { ProductoEditDto } from '../dtos/producto-edit.dto';

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
    const marca = new Marca();
    const medida = new Medida();
    marca.setId(new IdentifyUUID(request.marcaId));
    medida.setId(new IdentifyUUID(request.medidaId));
    request.medida = medida;
    request.marca = marca;
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
}