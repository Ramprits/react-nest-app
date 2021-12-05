import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcrypt';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  getTokenForUser(user: UserEntity): string {
    return this.jwtService.sign({ username: user.userName, sub: user.id });
  }
}
