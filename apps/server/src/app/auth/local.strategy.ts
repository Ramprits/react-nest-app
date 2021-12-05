import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { compare } from 'bcrypt';

import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name);
  constructor(private userService: UserService) {
    super();
  }

  async validate(username: string, password: string): Promise<UserEntity> {
    const user = await this.userService.findByUserName(username);
    if (!user) {
      this.logger.debug(`${username} provided is incorrect`);
      throw new UnauthorizedException();
    }
    if (!(await compare(password, user.password))) {
      this.logger.debug(`${password} provided is incorrect`);
      throw new UnauthorizedException();
    }
    return user;
  }
}
