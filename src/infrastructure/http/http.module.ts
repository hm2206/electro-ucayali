import { Module } from '@nestjs/common';
import { AuthenticationModule } from '../authentication/authentication.module';
import { DatabaseModule } from '../database/database.module';
import { LoginController } from './controllers/login.controller';
import { MarcasController } from './controllers/marcas.controller';
import { MedidasController } from './controllers/medidas.controller';
import { UsersController } from './controllers/users.controller';

@Module({
  imports: [DatabaseModule, AuthenticationModule],
  controllers: [
    MedidasController,
    MarcasController,
    UsersController,
    LoginController,
  ],
})
export class HttpModule {}
