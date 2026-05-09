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
  connectGoogle() {
    return 'Connection success!';
  }
}
