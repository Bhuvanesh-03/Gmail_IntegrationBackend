import { Injectable } from '@nestjs/common';
import { google } from 'googleApis';

@Injectable()
export class GoogleAuthService {
  private getOAuthClient() {
    return new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID, // your app's ID from Google Console
      process.env.GOOGLE_CLIENT_SECRET, // your app's secret from Google Console
      process.env.GOOGLE_REDIRECT_URI, // where Google sends the user after login
    );
  }
  getAuthUrl(userId: string): string {
    const client = this.getOAuthClient();
    return client.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      state: userId, // tracks which user is connecting
      scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/gmail.send',
        'https://www.googleapis.com/auth/gmail.readonly',
      ],
    });
  }
  async getTokens(code: string, userId: string) {
    const client = this.getOAuthClient();
    const { tokens } = await client.getToken(code);
    const expiryDate = tokens.expiry_date
      ? new Date(tokens.expiry_date).toISOString()
      : null;
    return {
      userId,
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiryDate,
    };
  }
}
