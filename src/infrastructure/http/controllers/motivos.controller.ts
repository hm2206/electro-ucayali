import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { of } from 'rxjs';
import { TypeormUnitOfWork } from 'src/infrastructure/database/unit-of-works/typeorm.unit-of-work';
import { PaginateDto } from '../../../shared/dtos/paginate.dto';
import { MotivoPaginateService } from 'src/application/motivo/motivo-paginate.service';
import { MotivoCreateDto } from '../dtos/motivo-create.dto';
import {
  MotivoFindRequest,
  MotivoFindService,
} from 'src/application/motivo/motivo-find.service';
import { MotivoEditDto } from '../dtos/motivo-edit.dto';
import { MotivoEditService } from 'src/application/motivo/motivo-edit.service';
import { MotivoDeleteService } from 'src/application/motivo/motivo-delete.service';
import { MotivoCreateService } from 'src/application/motivo/motivo-create.service';

@ApiTags('motivos')
@Controller('motivos')
export class MotivosController {
  constructor(private unitOfWork: TypeormUnitOfWork) {}

  @Get()
  async index(@Query() request: PaginateDto) {
    const service = new MotivoPaginateService(this.unitOfWork);
    const result = await this.unitOfWork.complete(() =>
      service.execute(request),
    );
    return of(result);
  }

  @Post()
  async store(@Body() request: MotivoCreateDto) {
    const service = new MotivoCreateService(this.unitOfWork);
    const result = await this.unitOfWork.complete(() =>
      service.execute(request),
    );
    return of(result);
  }

  @Get(':id')
  async show(@Param('id') params: MotivoFindRequest) {
    const service = new MotivoFindService(this.unitOfWork);
    const result = await this.unitOfWork.complete(() =>
      service.execute(params),
    );
    return of(result);
  }

  @Put(':id')
  async update(
    @Param() params: MotivoFindRequest,
    @Body() request: MotivoEditDto,
  ) {
    const service = new MotivoEditService(this.unitOfWork);
    const result = await this.unitOfWork.complete(() =>
      service.execute(params, request),
    );
    return of(result);
  }

  @Delete(':id')
  async delete(@Param() params: MotivoFindRequest) {
    const service = new MotivoDeleteService(this.unitOfWork);
    const result = await this.unitOfWork.complete(() =>
      service.execute(params),
    );
    return of(result);
  }
}
