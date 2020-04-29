import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(private readonly authService:AuthService) {
    super({ jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: 'secretKey', });
  }

  async validate(payload: any, done:VerifiedCallback) {
    const user = this.authService.validatePayload(payload);

    if(!user){
        return done(new HttpException("Acceso denegado", HttpStatus.UNAUTHORIZED),false,);
    }

    return done(null, user,payload.iat);
  }
}