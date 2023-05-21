import { Controller, UseGuards, Request, Get, Put, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request as IRequest } from 'express';
import { UserEditService } from 'src/application/users/user-edit.service';
import { UserFindService } from 'src/application/users/user-find.service';
import { User } from 'src/domain/entities/user';
import { IdentifyUUID } from 'src/domain/value-objects/identify-uuid';
import { JwtAuthGuard } from 'src/infrastructure/authentication/jwt-auth.guard';
import { TypeormUnitOfWork } from 'src/infrastructure/database/unit-of-works/typeorm.unit-of-work';
import { UserEditDto } from '../dtos/user-edit.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private unitOfWork: TypeormUnitOfWork) {}
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  handle(@Request() req: IRequest) {
    const user = new User();
    user.load(req.user);
    const service = new UserFindService(this.unitOfWork);
    const id = new IdentifyUUID(user.getId());
    return this.unitOfWork.complete(async () => await service.execute({ id }));
  }

  @Put('profile')
  @UseGuards(JwtAuthGuard)
  update(@Request() req: IRequest, @Body() payload: UserEditDto) {
    const user = new User();
    user.load(req.user);
    const service = new UserEditService(this.unitOfWork);
    const id = new IdentifyUUID(user.getId());
    return this.unitOfWork.complete(
      async () => await service.execute({ id }, payload),
    );
  }
}
