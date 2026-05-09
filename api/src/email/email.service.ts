import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  sendEmail() {
    return {
      Id: '1234',
      status: 'Success',
      Message: 'EmailSendSuccessfully',
    };
  }
}
