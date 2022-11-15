import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { typeormProvider } from './providers/typeorm.provider';
import { entitiesRepositories } from './repositories/entity.repository';
import { TypeormUnitOfWork } from './unit-of-works/typeorm.unit-of-work';

@Module({
  imports: [ConfigModule],
  providers: [typeormProvider, TypeormUnitOfWork, ...entitiesRepositories],
  exports: [typeormProvider, TypeormUnitOfWork, ...entitiesRepositories],
})
export class DatabaseModule {}
