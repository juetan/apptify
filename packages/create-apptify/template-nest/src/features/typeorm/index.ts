import { TypeOrmModule } from '@nestjs/typeorm';
import { Exclude, Transform } from 'class-transformer';
import { dayjs } from 'src/common';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

/**
 * 连接数据库
 */
export const TypeormModule = TypeOrmModule.forRoot({
  type: 'sqlite',
  database: 'database/sqlite/db.sqlite',
  synchronize: true,
  logging: false,
  autoLoadEntities: true,
  namingStrategy: new SnakeNamingStrategy(),
});

/**
 * 基础实体
 */
export class BaseEntity {
  /**
   * 自增ID
   * @example 1
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 唯一ID
   * @example dc3476e7544d465da581aa0b60ec0ffe
   */
  @Generated('uuid')
  @Column()
  guid: string;

  /**
   * 创建时间
   * @example "2022-01-01 10:10:10"
   */
  @Transform(({ value }) => dayjs(value).format())
  @CreateDateColumn()
  createAt: Date;

  /**
   * 更新时间
   * @example "2022-01-02 11:11:11"
   */
  @Transform(({ value }) => dayjs(value).format())
  @UpdateDateColumn()
  updateAt: Date;

  /**
   * 删除时间
   * @example "2022-01-03 12:12:12"
   */
  @Exclude()
  @Transform(({ value }) => dayjs(value).format())
  @DeleteDateColumn()
  deleteAt: Date;
}
