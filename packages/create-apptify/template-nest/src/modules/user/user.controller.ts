import { Body, Controller, Delete, Get, Param, Patch, Post, Version } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/common';
import { Public } from '../account/jwt';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './entities';
import { UserService } from './user.service';

@ApiTags('用户管理')
@Controller('users')
export class UserController extends BaseController {
  constructor(private userService: UserService) {
    super();
  }

  @Post()
  @ApiOperation({ summary: '创建用户', operationId: 'createUser' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Public()
  @Get()
  @ApiOkResponse({ isArray: true, type: User })
  @ApiOperation({ summary: '批量查询', operationId: 'selectUsers' })
  findMany() {
    this.logger.setContext(this.constructor.name);
    this.logger.log('ok');
    return this.userService.findAll();
  }

  @Version('2')
  @Get(':id')
  @ApiOperation({ summary: '查询用户', operationId: 'selectUser' })
  findOne(@Param('id') id: number) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新用户', operationId: 'updateUser' })
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除用户', operationId: 'deleteUser' })
  remove(@Param('id') id: number) {
    return this.userService.remove(+id);
  }
}