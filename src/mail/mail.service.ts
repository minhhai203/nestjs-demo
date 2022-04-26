import { MailerService } from '@nestjs-modules/mailer';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { AccountLogin } from '../auth/entities/account.entities';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    @InjectQueue('mailqueue')
    private mailQueue: Queue,
  ) {}

  async sendUserConfirmation(params: any) {
    await this.mailerService.sendMail({
      ...params,
    });
  }

  async sendMessage(user: AccountLogin): Promise<any> {
    const { email, firstName, provider } = user;
    await this.mailQueue.add('hehe', {
      to: email,
      from: '"Support Team" <support@just.engineer.com>',
      subject: '🚩🚩🚩🚩',
      template: 'confirmation',
      context: {
        name: firstName,
        provider: provider,
      },
    });
  }
}
