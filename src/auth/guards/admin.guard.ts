
import { ExecutionContext, Injectable, CanActivate } from "@nestjs/common";
import { User } from '../../users/user.entity'
import { Role } from '../enums/role.enum';

@Injectable()
export class AdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext) : Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    //this returns true if there is an user and the user has the role of admin
    return user && user.role === Role.Admin;
  }
}