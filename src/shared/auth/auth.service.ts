import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
    constructor(private readonly userService:UserService){}

    async signPayload(payload:any){
        return sign(payload,'secretKey',{expiresIn:'12h'});
    }

    async validatePayload(payload:any){
        return await this.userService.findByPayload(payload);
    }
}
