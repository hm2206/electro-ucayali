import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { of } from 'rxjs';
import { MedidaCreateService } from 'src/application/medidas/medida-create.service';
import { MedidaEditService } from 'src/application/medidas/medida-edit.service';
import {
  MedidaFindRequest,
  MedidaFindService,
} from 'src/application/medidas/medida-find.service';
import { MedidaPaginateService } from 'src/application/medidas/medida-paginate.service';
import { IdentifyUUID } from 'src/domain/value-objects/identify-uuid';
import { TypeormUnitOfWork } from 'src/infrastructure/database/unit-of-works/typeorm.unit-of-work';
import { MedidaCreateDto } from '../dtos/medida-create.dto';
import { MedidaEditDto } from '../dtos/medida-edit.dto';
import { PaginateDto } from '../../../shared/dtos/paginate.dto';

@ApiTags('Medidas')
@Controller('medidas')
export class MedidasController {
  constructor(private unitOfWork: TypeormUnitOfWork) {}

  @Get()
  async index(@Query() request: PaginateDto) {
    const service = new MedidaPaginateService(this.unitOfWork);
    const result = await this.unitOfWork.complete(() =>
      service.execute(request),
    );
    return of(result);
  }

  @Post()
  async store(@Body() request: MedidaCreateDto) {
    const service = new MedidaCreateService(this.unitOfWork);
    return this.unitOfWork
      .complete(() => service.execute(request))
      .catch((err) => {
        throw new HttpException(err.message, err.status || 501);
      });
  }

  @Get(':id')
  async show(@Param('id', ParseUUIDPipe) id: string) {
    const service = new MedidaFindService(this.unitOfWork);
    const request = new MedidaFindRequest();
    request.id = new IdentifyUUID(id);
    const result = await this.unitOfWork.complete(() =>
      service.execute(request),
    );
    return of(result);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() request: MedidaEditDto) {
    const service = new MedidaEditService(this.unitOfWork);
    request.id = new IdentifyUUID(id);
    return this.unitOfWork.complete(() => service.execute(request));
  }
}
