import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './login_auth/jwt.stategies';
import { AuthController } from './auth.controller';
import { FacebookStragery } from './login_auth/facebook.stategies';
import { GoogleStrategy } from './login_auth/google.stategies';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountLogin } from './entities/account.entities';
import { MailModule } from '../mail/mail.module';
import { MailProcessor } from '../mail/mail.processor';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'hehe',
      signOptions: { expiresIn: '3600s' },
    }),
    TypeOrmModule.forFeature([AccountLogin]),
    MailModule,
  ],
  providers: [
    AuthService,
    JwtStrategy,
    FacebookStragery,
    GoogleStrategy,
    MailProcessor,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
