import { Body, Controller, Post, HttpCode, HttpStatus, ValidationPipe, Request as Request2 } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/create-user-dto';
import { SignInDto } from './dtos/sign-in.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
signIn(@Body(new ValidationPipe()) signInDto: SignInDto) {
  return this.authService.signIn(signInDto.username, signInDto.password);
}

  @Post('signup')
  async signUp(@Body() CreateUserDto: CreateUserDto) {
      return this.authService.signUp(CreateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('upgrade')
  async upgrade(@Request2() req) {
      return this.authService.upgrade(req.user.id);
  }
 
}