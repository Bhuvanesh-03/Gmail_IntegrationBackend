import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';

@Injectable()
export class EmailService {
  private getOAuthClient() {
    return new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID, // your app's ID from Google Console
      process.env.GOOGLE_CLIENT_SECRET, // your app's secret from Google Console
      process.env.GOOGLE_REDIRECT_URI, // where Google sends the user after login
    );
  }
  private encodeEmail(to: string, subject: string, body: string): string {
    const emailLines = [
      `To: ${to}`,
      `Subject: ${subject}`,
      `Content-Type: text/plain; charset=utf-8`,
      '',
      body,
    ].join('\n');

    return Buffer.from(emailLines)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }
  async sendEmail(userId: string) {
    const client = this.getOAuthClient();
    const gmail = google.gmail({ version: 'v1', auth: client });
    client.setCredentials({
      '',
      '',
    });
    // ✅ then call users.messages.send
    const { data } = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: this.encodeEmail('bhuvanesh03102000@gmail.com', 'Hi', 'Hi'),
      },
    });
    return {
      Id: '1234',
      status: 'Success',
      Message: 'EmailSendSuccessfully',
    };
  }
}
