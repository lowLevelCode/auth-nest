import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { RegisterDto, LoginDto } from './dtos/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/data/entities/user.entity';



@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}    

    /**
     * Crea un nuevo usuario
     * @param registerDto 
     */
    async create(registerDto:RegisterDto): Promise<User>
    {   
        const {email,password} = registerDto;
        let emailExist = await this.usersRepository.findOne({email});

        if(emailExist)
            throw new HttpException("El correo ya existe", HttpStatus.BAD_REQUEST);        

        let map = new Map(Object.entries(registerDto));
        let user = new User();        

        map.forEach((value,key) => { user[key] = value  });

        await user.hashPassword(password);
        return await this.usersRepository.save(user);
    }

    /**
     * busca usuario por email y contraseña.
     * @param loginDto 
     */
    async findByLoging(loginDto:LoginDto): Promise<User>
    {
        const {email, password} = loginDto;
        let user:User = await this.usersRepository.findOne({email});        

        if(!user)
            throw new HttpException("Credenciales incorrectas", HttpStatus.UNAUTHORIZED);        
        
        if(await !user.sanitizePassword(password))
            throw new HttpException("Credenciales incorrectas", HttpStatus.UNAUTHORIZED);        

        return user;
    }    

    async findByPayload(payload:any){
        const {email} = payload;
        return await this.usersRepository.findOne({email});
    }
}
