import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { EmailModule } from './email/email.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [HealthModule, EmailModule, AuthModule],
})
export class AppModule {}
