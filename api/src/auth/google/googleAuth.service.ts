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
  async getUserProfileInfo(userId: string, newAccessToken: string) {
    const client = this.getOAuthClient();
    console.log('getUserProfileInfo');
    const accessToken = newAccessToken || '';
    client.setCredentials({ access_token: accessToken });

    // Create a gmail instance using the authenticated client
    const gmail = google.gmail({ version: 'v1', auth: client });

    // Make the callout to Gmail API to get the profile
    const { data } = await gmail.users.getProfile({ userId: userId });
    // 'me' means "the currently authenticated user"
    // Google knows who "me" is because of the accessToken we set
    return {
      email: data.emailAddress, // their Gmail address
      totalMessages: data.messagesTotal, // total emails in their inbox
      threadCount: data.threadsTotal, // total threads
    };
  }
  async refreshAccessToken(refreshToken: string) {
    const clinet = this.getOAuthClient();
    clinet.setCredentials({
      refresh_token: refreshToken,
    });
    return await clinet.refreshAccessToken();
  }
}
