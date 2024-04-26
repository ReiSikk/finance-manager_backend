import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './create-user-dto';
import { User } from './user.entity';
import { Role } from '../auth/enums/role.enum';


@Injectable()
export class UsersService {
constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
) {}

async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({ where: { username: createUserDto.username } });

    if (existingUser) {
      throw new ConflictException('Username is already taken');
    }
  


    const user = new User();
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    user.role = Role.User;

    if(createUserDto.username.endsWith('@finance.admin')){
      user.role = Role.Admin;
    } 

    return this.userRepository.save(user);
  }

  async findOne(username: string): Promise<User | undefined> {
     return await this.userRepository.findOne({ where: { username } });
  }
  async findUserById(id: number) : Promise<User> {
    return this.userRepository.findOne({where: {id: id}});
}

async findAll(): Promise<User[]> {
  return this.userRepository.find();
}

  async upgrade(userId: number) {
    const user = await this.findUserById(userId); // find user by the userId
    user.role = Role.PremiumUser; // changing the role in memory
    return this.userRepository.save(user); //saving the updated user obj. to the db
}
}

 