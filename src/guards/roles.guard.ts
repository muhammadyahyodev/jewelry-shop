import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/roles-auth.decorator';
import { JwtPayload } from '../types';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );
      console.log(requiredRoles);
      if (!requiredRoles) {
        return true;
      }

      const req: Request = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' && !token) {
        throw new UnauthorizedException({ message: 'Condidate unauthorized' });
      }

      const user: JwtPayload = this.jwtService.verify(token, {
        publicKey: process.env.ACCESS_TOKEN_KEY,
      });

      console.log(
        user.roles.some((role) => requiredRoles.includes(role.value)),
      );
      console.log(user.is_active);

      console.log(
        user.roles.some((role) => requiredRoles.includes(role.value)) &&
          user.is_active,
      );

      return (
        user.roles.some((role) => requiredRoles.includes(role.value)) &&
        user.is_active
      );
    } catch (error) {
      console.log(error);
      throw new HttpException('Jwt expired', HttpStatus.UNAUTHORIZED);
    }
  }
}
