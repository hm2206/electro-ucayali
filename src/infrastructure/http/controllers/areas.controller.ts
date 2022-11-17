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
import { AreaCreateService } from 'src/application/areas/area-create.service';
import { AreaEditService } from 'src/application/areas/area-edit.service';
import {
  AreaFindRequest,
  AreaFindService,
} from 'src/application/areas/area-find.service';
import { AreaPaginateService } from 'src/application/areas/area-paginate.service';
import { IdentifyUUID } from 'src/domain/value-objects/identify-uuid';
import { TypeormUnitOfWork } from 'src/infrastructure/database/unit-of-works/typeorm.unit-of-work';
import { AreaCreateDto } from '../dtos/area-create.dto';
import { AreaEditDto } from '../dtos/area-edit.dto';
import { PaginateDto } from '../dtos/paginate.dto';

@Controller('areas')
export class AreasController {
  constructor(private unitOfWork: TypeormUnitOfWork) {}

  @Get()
  async index(@Query() request: PaginateDto) {
    const service = new AreaPaginateService(this.unitOfWork);
    const result = await this.unitOfWork.complete(() =>
      service.execute(request),
    );
    return of(result);
  }

  @Post()
  async store(@Body() request: AreaCreateDto) {
    const service = new AreaCreateService(this.unitOfWork);
    const result = await this.unitOfWork.complete(() =>
      service.execute(request),
    );
    return of(result);
  }

  @Get(':id')
  async show(@Param('id', ParseUUIDPipe) id: string) {
    const service = new AreaFindService(this.unitOfWork);
    const request = new AreaFindRequest();
    request.id = new IdentifyUUID(id);
    const result = await this.unitOfWork.complete(() =>
      service.execute(request),
    );
    return of(result);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() request: AreaEditDto) {
    const service = new AreaEditService(this.unitOfWork);
    request.id = new IdentifyUUID(id);
    const result = await this.unitOfWork.complete(() =>
      service.execute(request),
    );
    return of(result);
  }
}
