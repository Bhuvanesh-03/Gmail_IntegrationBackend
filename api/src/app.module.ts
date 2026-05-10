import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { EmailModule } from './email/email.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    HealthModule,
    EmailModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}
