import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleAuthService } from './google/googleAuth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, GoogleAuthService],
})
export class AuthModule {}
