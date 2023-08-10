import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { typeormProvider } from './providers/typeorm.provider';
import { entitiesRepositories } from './repositories/entity.repository';
import { TypeormManualUnitOfWork } from './unit-of-works/typeorm-manual.unit-of-work';
import { TypeormUnitOfWork } from './unit-of-works/typeorm.unit-of-work';

@Module({
  imports: [ConfigModule],
  providers: [typeormProvider, TypeormUnitOfWork, TypeormManualUnitOfWork, ...entitiesRepositories],
  exports: [typeormProvider, TypeormUnitOfWork, TypeormManualUnitOfWork, ...entitiesRepositories],
})
export class DatabaseModule { }
