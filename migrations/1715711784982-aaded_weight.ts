import { MigrationInterface, QueryRunner } from 'typeorm';

export class AadedWeight1715711784982 implements MigrationInterface {
  name = 'AadedWeight1715711784982';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "weight" numeric`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "weight"`);
  }
}
