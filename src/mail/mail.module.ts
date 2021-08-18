import { AppConfig } from '@configs/app/app.config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { join } from 'path';
import { SendActivationAccountMailHandler } from './commands/send-activation-account-mail.command';
import { SendResetPasswordMailHandler } from './commands/send-reset-password-mail.command';

const MailCommandHandlers = [
  SendActivationAccountMailHandler,
  SendResetPasswordMailHandler,
];

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: AppConfig) => ({
        transport: {
          host: config.get('MAIL_HOST'),
          secure: false,
          auth: {
            user: config.get('MAIL_USER'),
            pass: config.get('MAIL_PASSWORD'),
          },
        },
        defaults: {
          from: `"No Reply" <${config.get('MAIL_FROM')}>`,
        },
        template: {
          dir: join(__dirname, '../templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [AppConfig],
    }),
    JwtModule.register({}),
    CqrsModule,
  ],
  providers: [...MailCommandHandlers],
})
export class MailModule {}
