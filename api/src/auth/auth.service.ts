import { Injectable } from '@nestjs/common';
import { GoogleAuthService } from './google/googleAuth.service';

@Injectable()
export class AuthService {
  constructor(private readonly googleAuthService: GoogleAuthService) {}
  connectGoogle() {
    return this.googleAuthService.connectGoogle();
  }
}
