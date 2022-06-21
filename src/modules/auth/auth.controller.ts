import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  Get,
  Headers,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req) {
    return await this.authService.login(req.user, req.body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async findMe(@Request() req, @Headers() headers) {
    const user = await this.authService.findMe(
      req,
      headers.authorization.split(' ')[1],
    );
    if (!user) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }
    return user;
  }
}
