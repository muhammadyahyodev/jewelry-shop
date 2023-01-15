import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '../user/schemas/user.model';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: User, link: string): Promise<void> {
    const url = `${process.env.API_HOST}/api/user/activate/${link}`;

    console.log(url);
    console.log(user);

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './confirmation',
      context: {
        name: user.first_name,
        url,
      },
    });
  }
}
