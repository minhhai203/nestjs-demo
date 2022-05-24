import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/login_auth/jwt-auth.guard';
import { Account, User } from './user/entities/user.entity';

@Controller()
@ApiTags('Login')
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards()
  @Post('auth/login')
  @ApiBody({ type: Account, required: true })
  async login(@Request() @Body() req) {
    return this.authService.loginWithCredentials(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOperation({ summary: 'Get profile user' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'successfully',
    type: User,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized...' })
  async getProfile(@Request() req) {
    return this.authService.validateUser(req.user.username, req?.user.pass);
  }
}
