import { User } from 'src/domain/entities/user';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GenerateTokenService {
  constructor(private jwtService: JwtService) {}
  async execute(user: User) {
    const payload = { username: user.getEmail(), sub: user.getId() };
    return { accessToken: this.jwtService.sign(payload) };
  }
}
