import {
  Controller,
  Get,
  Logger,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Request() req) {
    return {
      userId: req.user.id,
      token: this.authService.getTokenForUser(req.user),
    };
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  async profile(@CurrentUser() user: UserEntity) {
    return user;
  }
}
