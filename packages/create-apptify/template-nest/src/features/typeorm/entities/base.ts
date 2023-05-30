import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
  @Exclude()
  @Generated('uuid')
  @Column()
  guid: string;

  /**
   * 创建时间
   * @example "2022-01-01 10:10:10"
   */
  @CreateDateColumn()
  createAt: Date;

  /**
   * 更新时间
   * @example "2022-01-02 11:11:11"
   */
  @UpdateDateColumn()
  updateAt: Date;

  /**
   * 删除时间
   * @example "2022-01-03 12:12:12"
   */
  @Exclude()
  @DeleteDateColumn()
  deleteAt: Date;
}