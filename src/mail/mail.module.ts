import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async () => ({
        transport: `smtps://${process.env.EMAIL_USER}:${process.env.EMAIL_PASSWORD}@smtp.gmail.com`,
        defaults: {
          from: '"No Reply Hehe" <noreply@example.com>',
        },
        template: {
          dir: join(__dirname, './templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'mailqueue',
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
