import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request as RequestExpress } from 'express';
import { User } from 'src/domain/entities/user';
import { GenerateTokenService } from 'src/infrastructure/authentication/generate-token.service';
import { LocalAuthGuard } from 'src/infrastructure/authentication/local-auth.guard';

@ApiTags('Login')
@Controller('login')
export class LoginController {
  constructor(private generateTokenService: GenerateTokenService) {}

  @Post()
  @UseGuards(LocalAuthGuard)
  handle(@Request() req: RequestExpress) {
    const user = new User();
    user.load(req.user);
    return this.generateTokenService.execute(user);
  }
}
