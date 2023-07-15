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
import { SituacionPaginateService } from 'src/application/situacion/situacion-paginate.service';
import { SituacionCreateDto } from '../dtos/situacion-create.dto';
import {
  SituacionFindRequest,
  SituacionFindService,
} from 'src/application/situacion/situacion-find.service';
import { SituacionCreateService } from 'src/application/situacion/situacion-create.service';
import { SituacionEditDto } from '../dtos/situacion-edit.dto';
import { SituacionEditService } from 'src/application/situacion/situacion-edit.service';
import { SituacionDeleteService } from 'src/application/situacion/situacion-delete.service';

@ApiTags('situaciones')
@Controller('situaciones')
export class SituacionesController {
  constructor(private unitOfWork: TypeormUnitOfWork) {}

  @Get()
  async index(@Query() request: PaginateDto) {
    const service = new SituacionPaginateService(this.unitOfWork);
    const result = await this.unitOfWork.complete(() =>
      service.execute(request),
    );
    return of(result);
  }

  @Post()
  async store(@Body() request: SituacionCreateDto) {
    const service = new SituacionCreateService(this.unitOfWork);
    const result = await this.unitOfWork.complete(() =>
      service.execute(request),
    );
    return of(result);
  }

  @Get(':id')
  async show(@Param() params: SituacionFindRequest) {
    const service = new SituacionFindService(this.unitOfWork);
    const result = await this.unitOfWork.complete(() =>
      service.execute(params),
    );
    return of(result);
  }

  @Put(':id')
  async update(
    @Param() params: SituacionFindRequest,
    @Body() request: SituacionEditDto,
  ) {
    const service = new SituacionEditService(this.unitOfWork);
    const result = await this.unitOfWork.complete(() =>
      service.execute(params, request),
    );
    return of(result);
  }

  @Delete(':id')
  async delete(@Param() params: SituacionFindRequest) {
    const service = new SituacionDeleteService(this.unitOfWork);
    const result = await this.unitOfWork.complete(() =>
      service.execute(params),
    );
    return of(result);
  }
}
