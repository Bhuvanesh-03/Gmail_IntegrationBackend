import { Injectable } from '@nestjs/common';
import { GoogleAuthService } from './google/googleAuth.service';

@Injectable()
export class AuthService {
  constructor(private readonly googleAuthService: GoogleAuthService) {}
  // Returns Google login URL for the user
  getGoogleAuthUrl(userId: string): string {
    return this.googleAuthService.getAuthUrl(userId);
  }
  // Handles callback and returns tokens
  async handleGoogleCallback(code: string, userId: string) {
    return this.googleAuthService.getTokens(code, userId);
  }
}
