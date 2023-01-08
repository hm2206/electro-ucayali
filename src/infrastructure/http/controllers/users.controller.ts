import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { of } from 'rxjs';
import { UserCreateService } from 'src/application/users/user-create.service';
import { UserEditRequest } from 'src/application/users/user-edit.service';
import { UserFindService } from 'src/application/users/user-find.service';
import { UserPaginateService } from 'src/application/users/user-paginate.service';
import { TypeormUnitOfWork } from 'src/infrastructure/database/unit-of-works/typeorm.unit-of-work';
import { PaginateDto } from '../../../shared/dtos/paginate.dto';
import { UserCreateDto } from '../dtos/user-create.dto';
import { UserFindDto } from '../dtos/user-find.dto';

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
  async update(@Param() params: UserFindDto, @Body() request: UserEditRequest) {
    const service = new UserFindService(this.unitOfWork);
    request.id = params.id;
    const result = await this.unitOfWork.complete(() =>
      service.execute(request),
    );
    return of(result);
  }
}
