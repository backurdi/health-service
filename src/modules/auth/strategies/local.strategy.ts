import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ passReqToCallback: true });
  }

  async validate(req: Request, email: string, password: string) {
    const user = await this.authService.validateUser(
      email,
      password,
      (req.body as any).role,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
