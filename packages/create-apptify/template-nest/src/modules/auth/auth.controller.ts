import { Controller, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from './jwt';
import { LocalAuthGuard } from './local';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private accountService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: '账号或密码错误' })
  @ApiOperation({ summary: '账号登录', operationId: 'login' })
  login(@Request() req: any) {
    this.accountService.sign(req.user);
  }
}
