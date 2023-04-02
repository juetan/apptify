import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './entities';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  /**
   * 创建用户
   */
  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);
    return user.id;
  }

  /**
   * 查找所有用户
   */
  async findAll() {
    return this.userRepository.findAndCount();
  }

  /**
   * 根据id查找用户
   */
  findOne(idOrOptions: number | Partial<User>) {
    const where = typeof idOrOptions === 'number' ? { id: idOrOptions } : idOrOptions;
    return this.userRepository.findOne({ where });
  }

  /**
   * 根据用户id
   */
  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  /**
   * 根据id删除用户
   */
  remove(id: number) {
    return this.userRepository.softDelete(id);
  }

  /**
   * 根据用户名查找用户
   */
  find(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }
}
