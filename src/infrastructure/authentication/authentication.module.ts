import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from '../database/database.module';
import { jwtConstants } from './constants';
import { GenerateTokenService } from './generate-token.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    PassportModule,
    DatabaseModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600m' },
    }),
  ],
  providers: [LocalStrategy, JwtStrategy, GenerateTokenService],
  exports: [GenerateTokenService],
})
export class AuthenticationModule {}
