import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddActiveInEmployee1707515274331 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE employees ADD COLUMN active boolean NOT NULL DEFAULT true;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE employees DROP COLUMN active;`);
  }
}
