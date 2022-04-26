/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';

@Injectable()
export class FacebookStragery extends PassportStrategy(Strategy, 'facebook') {
  constructor() {
    super({
      clientID: process.env.APP_ID,
      clientSecret: process.env.APP_SECRET,
      callbackURL: 'http://localhost:3000/auth/facebook/redirect',
      scope: 'email',
      profileFields: ['email', 'name'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<any> {
    const { name, emails, provider, id } = profile;
    const { givenName, familyName } = name;
    const user = {
      email: emails?.[0]?.value,
      firstName: givenName,
      lastName: familyName,
      provider,
      id,
    };
    const payload = {
      user,
      accessToken,
    };
    done(null, payload);
  }
}
