import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, ObjectIdColumn, ObjectID } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
    
    @ObjectIdColumn()
    id: ObjectID;    

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column({ length: 100, nullable: false })  
    private  password: string;

    @Column({ type: 'boolean', default: true })
    isActive: boolean;    
    
    async hashPassword(password: string) {
        const salt = await bcrypt.genSalt();        
        this.password = await bcrypt.hash(password || this.password, salt);           
    }

    async sanitizePassword(password: string,)
    {
        return await bcrypt.compare(password,this.password);
    }
}