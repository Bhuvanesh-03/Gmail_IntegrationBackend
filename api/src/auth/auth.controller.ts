import { Controller, Get, Redirect, Query, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Step 1 — User hits this URL to start connecting their Gmail
  // http://localhost:3000/auth/google/connect?userId=john@company.com
  @Get('google/connect')
  @Redirect()
  connect(@Query('userId') userId: string) {
    const url = this.authService.getGoogleAuthUrl(userId);
    return { url };
  }

  // Step 2 — Google calls this after user logs in
  // http://localhost:3000/auth/google/callback?code=...&state=john@company.com
  @Get('google/callback')
  async callback(
    @Query('code') code: string,
    @Query('state') userId: string,
    @Res() res: Response,
  ): Promise<void> {
    const tokens = await this.authService.handleGoogleCallback(code, userId);
    res.json({ success: true, tokens });
  }
}
