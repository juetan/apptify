import { Module } from '@nestjs/common';
import { UserModule } from '../user';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { AppJwtGuard, JwtAuthService, JwtModule } from './jwt';
import { LocalAuthService } from './local';

@Module({
  imports: [UserModule, JwtModule],
  providers: [AccountService, LocalAuthService, JwtAuthService, AppJwtGuard],
  exports: [AccountService],
  controllers: [AccountController],
})
export class AccountModule {}
