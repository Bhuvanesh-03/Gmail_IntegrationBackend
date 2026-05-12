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

  async checkAuthStatus(userId: string) {
    console.log(userId);
    const refreshed = await this.getNewAccessToken(userId);
    const accessToken = refreshed?.credentials?.access_token ?? '';
    return await this.googleAuthService.getUserProfileInfo(userId, accessToken);
  }
  getNewAccessToken(userId: string) {
    const { refreshToken } = this.getUserDetails(userId); //parse the user details to get the access token
    console.log('refreshToken', refreshToken);
    return this.googleAuthService.refreshAccessToken(refreshToken);
  }
  getUserDetails(userId: string) {
    return {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken', //this is the refresh token for the user-> get this from db
      expiryDate: 'expiryDate',
      userEmail: 'userEmail',
      userId: userId,
      userName: 'userName',
    }; //return the user details as a object
  }
}
