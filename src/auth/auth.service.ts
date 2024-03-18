import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
    ) {}

    async signIn(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user && await bcrypt.compare(password, user.password)) {
          const payload = { username: user.username, role: user.role };
          return {
            success: true,
            access_token: await this.jwtService.signAsync(payload),
            username: user.username,
            role: user.role,
          };
        } else {
          throw new UnauthorizedException({success: false, message: 'Invalid credentials' });
        }
      }

    async signUp(createUserDto): Promise<any> {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
        createUserDto.password = hashedPassword;
        return this.usersService.create(createUserDto);
      }
      async upgrade(userId: number) {
        return this.usersService.upgrade(userId)
      }
    }