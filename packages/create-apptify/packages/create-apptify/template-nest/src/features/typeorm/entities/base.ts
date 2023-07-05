import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

/**
 * 基础实体, 默认按照id倒序
 */
@Entity({ orderBy: { id: 'DESC' } })
export class BaseEntity {
  /**
   * 自增ID
   * @example 1
   */
  @PrimaryGeneratedColumn({ comment: '自增ID' })
  id: number;

  /**
   * 创建时间
   * @example "2022-01-01 10:10:10"
   */
  @CreateDateColumn({ comment: '创建时间' })
  createdAt: Date;

  /**
   * 创建人ID
   * @example 1
   */
  @Column({ comment: '创建人' })
  createdBy: number;

  /**
   * 更新时间
   * @example "2022-01-02 11:11:11"
   */
  @UpdateDateColumn({ comment: '更新时间' })
  updatedAt: Date;

  /**
   * 更新人ID
   * @example 1
   */
  @Column({ comment: '更新人' })
  updatedBy: number;

  /**
   * 删除时间
   * @example "2022-01-03 12:12:12"
   */
  @Exclude()
  @DeleteDateColumn({ comment: '删除时间' })
  deleteddAt: Date;

  /**
   * 删除人ID
   * @example 1
   */
  @Exclude()
  @Column({ comment: '删除人' })
  deletedBy: number;
}
