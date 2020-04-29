import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { User } from 'src/data/entities/user.entity';
import { JwtStrategy } from '../jwt.strategy';


@Module({      
  imports: [TypeOrmModule.forFeature([User])], 
  controllers: [AuthController,],
  providers: [AuthService, UserService, JwtStrategy]
})
export class AuthModule {}
