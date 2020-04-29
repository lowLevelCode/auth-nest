import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dtos/login.dto';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    
    constructor(private readonly authService:AuthService, private readonly userService:UserService){}    

    @Post("login")
    async login(@Body() loginDto:LoginDto)
    {  
        
        const user = await this.userService.findByLoging(loginDto);
        
        const payload = { email : user.email }
        const token = await this.authService.signPayload(payload);
        return { user, token};
    }        
    
    @Post("register")    
    async registrar(@Body() registerDto:RegisterDto)
    {
        const user = await this.userService.create(registerDto);

        const payload = { email : user.email }
        const token = await this.authService.signPayload(payload);
        return { user, token};
    }
}
