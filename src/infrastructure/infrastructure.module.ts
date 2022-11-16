import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { HttpModule } from './http/http.module';

@Module({
  imports: [HttpModule, AuthenticationModule],
})
export class InfrastructureModule {}
