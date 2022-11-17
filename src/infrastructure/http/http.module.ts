import { Module } from '@nestjs/common';
import { AuthenticationModule } from '../authentication/authentication.module';
import { DatabaseModule } from '../database/database.module';
import { AreasController } from './controllers/areas.controller';
import { LoginController } from './controllers/login.controller';
import { LugaresController } from './controllers/lugares.controller';
import { MarcasController } from './controllers/marcas.controller';
import { MedidasController } from './controllers/medidas.controller';
import { UsersController } from './controllers/users.controller';

@Module({
  imports: [DatabaseModule, AuthenticationModule],
  controllers: [
    MedidasController,
    MarcasController,
    UsersController,
    AreasController,
    LugaresController,
    LoginController,
  ],
})
export class HttpModule {}
