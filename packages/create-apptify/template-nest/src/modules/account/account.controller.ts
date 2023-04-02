import { Controller, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccountService } from './account.service';
import { Public } from './jwt';
import { LocalAuthGuard } from './local';

@ApiTags('用户')
@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: '账号或密码错误' })
  @ApiOperation({ summary: '账号登录', operationId: 'login' })
  login(@Request() req: any) {
    this.accountService.sign(req.user);
  }
}
