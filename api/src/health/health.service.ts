import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  check() {
    return {
      status: 'ok',
      service: 'gmail-middleware',
      timestamp: new Date().toISOString(),
    };
  }
}
