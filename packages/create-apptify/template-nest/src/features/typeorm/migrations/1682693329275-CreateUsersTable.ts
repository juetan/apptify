import mock from 'mockjs';
import { nanoid } from 'nanoid';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1682693329275 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const numbers = Array(20).fill(0);
    const users = numbers.map(() => {
      const guid = nanoid();
      const username = mock.Random.name();
      const nickname = mock.Random.cname();
      const description = mock.Random.csentence();
      const avatar = mock.Random.image();
      const password = '123456';
      return [guid, username, nickname, description, avatar, password];
    });
    const fields = ['guid', 'username', 'nickname', 'description', 'avatar', 'password'].join(',');
    const values = users.map((user) => `(${user.join(',')})`).join(',');
    await queryRunner.query(`INSERT INTO user (${fields}) VALUES ${values}`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE TABLE users`);
  }
}
