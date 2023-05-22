import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { of } from 'rxjs';
import { TypeormUnitOfWork } from 'src/infrastructure/database/unit-of-works/typeorm.unit-of-work';
import { DetalleCreateDto } from '../dtos/detalle-create.dto';
import { DetailCreateService } from 'src/application/detail/detail-create.service';
import {
  DetailFindRequest,
  DetailFindService,
} from 'src/application/detail/detail-find.service';
import { DetailEditService } from 'src/application/detail/detail-edit.service';
import { DetailDeleteService } from 'src/application/detail/detail-delete.service';

@ApiTags('Detalles')
@Controller('detalles')
export class DetallesController {
  constructor(private unitOfWork: TypeormUnitOfWork) {}

  @Post()
  async store(@Body() request: DetalleCreateDto) {
    const service = new DetailCreateService(this.unitOfWork);
    const result = await this.unitOfWork.complete(() =>
      service.execute(request),
    );
    return of(result);
  }

  @Get(':id')
  async show(@Param() request: DetailFindRequest) {
    const service = new DetailFindService(this.unitOfWork);
    const result = await this.unitOfWork.complete(() =>
      service.execute(request),
    );
    return of(result);
  }

  @Put(':id')
  async update(
    @Param() params: DetailFindRequest,
    @Body() request: DetalleCreateDto,
  ) {
    const service = new DetailEditService(this.unitOfWork);
    const result = await this.unitOfWork.complete(() =>
      service.execute(params, request),
    );
    return of(result);
  }

  @Delete(':id')
  async delete(@Param() params: DetailFindRequest) {
    const service = new DetailDeleteService(this.unitOfWork);
    const result = await this.unitOfWork.complete(() =>
      service.execute(params),
    );
    return of(result);
  }
}
