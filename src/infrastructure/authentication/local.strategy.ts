import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { TypeormUnitOfWork } from '../database/unit-of-works/typeorm.unit-of-work';
import {
  UserVerifyRequest,
  UserVerifyService,
} from 'src/application/users/user-verify.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private unitOfWork: TypeormUnitOfWork) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const request = new UserVerifyRequest();
    request.username = username;
    request.password = password;
    const service = new UserVerifyService(this.unitOfWork);
    await this.unitOfWork.start();
    return this.unitOfWork.complete(async () => await service.execute(request));
  }
}
