import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { of } from 'rxjs';
import { UserCreateService } from 'src/application/users/user-create.service';
import { UserEditRequest } from 'src/application/users/user-edit.service';
import {
  UserFindRequest,
  UserFindService,
} from 'src/application/users/user-find.service';
import { IdentifyUUID } from 'src/domain/value-objects/identify-uuid';
import { TypeormUnitOfWork } from 'src/infrastructure/database/unit-of-works/typeorm.unit-of-work';
import { UserCreateDto } from '../dtos/user-create.dto';

@Controller('users')
export class UsersController {
  constructor(private unitOfWork: TypeormUnitOfWork) {}

  @Post()
  async store(@Body() request: UserCreateDto) {
    const service = new UserCreateService(this.unitOfWork);
    const result = await this.unitOfWork.complete(() =>
      service.execute(request),
    );
    return of(result);
  }

  @Get(':id')
  async show(@Param('id', ParseUUIDPipe) id: string) {
    const service = new UserFindService(this.unitOfWork);
    const request = new UserFindRequest();
    request.id = new IdentifyUUID(id);
    const result = await this.unitOfWork.complete(() =>
      service.execute(request),
    );
    return of(result);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() request: UserEditRequest) {
    const service = new UserFindService(this.unitOfWork);
    request.id = new IdentifyUUID(id);
    const result = await this.unitOfWork.complete(() =>
      service.execute(request),
    );
    return of(result);
  }
}
