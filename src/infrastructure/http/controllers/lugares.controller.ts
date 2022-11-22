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
import { of } from 'rxjs';
import { LugarCreateService } from 'src/application/lugares/lugar-create.service';
import { LugarEditService } from 'src/application/lugares/lugar-edit.service';
import {
  LugarFindRequest,
  LugarFindService,
} from 'src/application/lugares/lugar-find.service';
import { LugarPaginateService } from 'src/application/lugares/lugar-paginate.service';
import { IdentifyUUID } from 'src/domain/value-objects/identify-uuid';
import { TypeormUnitOfWork } from 'src/infrastructure/database/unit-of-works/typeorm.unit-of-work';
import { LugarCreateDto } from '../dtos/lugar-create.dto';
import { LugarEditDto } from '../dtos/lugar-edit.dto';
import { PaginateDto } from '../dtos/paginate.dto';

@ApiTags('Lugares')
@Controller('lugares')
export class LugaresController {
  constructor(private unitOfWork: TypeormUnitOfWork) {}

  @Get()
  async index(@Query() request: PaginateDto) {
    const service = new LugarPaginateService(this.unitOfWork);
    const result = await this.unitOfWork.complete(() =>
      service.execute(request),
    );
    return of(result);
  }

  @Post()
  async store(@Body() request: LugarCreateDto) {
    const service = new LugarCreateService(this.unitOfWork);
    const result = await this.unitOfWork.complete(() =>
      service.execute(request),
    );
    return of(result);
  }

  @Get(':id')
  async show(@Param('id', ParseUUIDPipe) id: string) {
    const service = new LugarFindService(this.unitOfWork);
    const request = new LugarFindRequest();
    request.id = new IdentifyUUID(id);
    const result = await this.unitOfWork.complete(() =>
      service.execute(request),
    );
    return of(result);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() request: LugarEditDto) {
    const service = new LugarEditService(this.unitOfWork);
    request.id = new IdentifyUUID(id);
    const result = await this.unitOfWork.complete(() =>
      service.execute(request),
    );
    return of(result);
  }
}
