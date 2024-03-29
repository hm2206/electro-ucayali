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
import { UserCreateService } from 'src/application/users/user-create.service';
import { UserEditService } from 'src/application/users/user-edit.service';
import { UserFindService } from 'src/application/users/user-find.service';
import { UserPaginateService } from 'src/application/users/user-paginate.service';
import { TypeormUnitOfWork } from 'src/infrastructure/database/unit-of-works/typeorm.unit-of-work';
import { PaginateDto } from '../../../shared/dtos/paginate.dto';
import { UserCreateDto } from '../dtos/user-create.dto';
import { UserFindDto } from '../dtos/user-find.dto';
import { UserEditDto } from '../dtos/user-edit.dto';
import { UserDeleteService } from 'src/application/users/user-delete.service';

@ApiTags('Usuarios')
@Controller('users')
export class UsersController {
  constructor(private unitOfWork: TypeormUnitOfWork) {}

  @Get()
  async index(@Query() request: PaginateDto) {
    const service = new UserPaginateService(this.unitOfWork);
    const result = await this.unitOfWork.complete(() =>
      service.execute(request),
    );
    return of(result);
  }

  @Post()
  async store(@Body() request: UserCreateDto) {
    const service = new UserCreateService(this.unitOfWork);
    const result = await this.unitOfWork.complete(() =>
      service.execute(request),
    );
    return of(result);
  }

  @Get(':id')
  async show(@Param() request: UserFindDto) {
    const service = new UserFindService(this.unitOfWork);
    const result = await this.unitOfWork.complete(() =>
      service.execute(request),
    );
    return of(result);
  }

  @Put(':id')
  async update(@Param() params: UserFindDto, @Body() request: UserEditDto) {
    const service = new UserEditService(this.unitOfWork);
    const result = await this.unitOfWork.complete(() =>
      service.execute(params, request),
    );
    return of(result);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const service = new UserDeleteService(this.unitOfWork);
    const result = await this.unitOfWork.complete(() => service.execute(id));
    return of(result);
  }
}
