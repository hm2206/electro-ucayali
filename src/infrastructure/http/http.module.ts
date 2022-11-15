import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { MedidasController } from './controllers/medidas.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [MedidasController],
})
export class HttpModule {}
