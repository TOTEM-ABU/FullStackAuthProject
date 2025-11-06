import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}
  canActivate(context: ExecutionContext): boolean {
    let request: Request = context.switchToHttp().getRequest();

    // Try to get token from cookies first, then from headers
    let token =
      request.cookies?.access_token ||
      request.headers.authorization?.split(' ')[1];

    console.log('AuthGuard - Cookies:', request.cookies);
    console.log('AuthGuard - Token:', token);

    if (!token) {
      throw new UnauthorizedException('Token not provided!');
    }
    try {
      let data = this.jwt.verify(token, {
        secret: process.env.ACCESS_SECRET || 'accessSecret',
      });
      console.log('AuthGuard - Decoded data:', data);
      request['user'] = data.id;
      request['role'] = data.role;
      return true;
    } catch (error) {
      console.error('AuthGuard - Error:', error);
      throw new UnauthorizedException('Invalid token!');
    }
  }
}
