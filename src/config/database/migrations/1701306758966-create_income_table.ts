import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateIncomeTable1701306758966 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE incomes (
        id UUID NOT NULL DEFAULT uuid_generate_v4(),
        description VARCHAR(50) NOT NULL,
        value NUMERIC(10,2) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT now(),
        updated_at TIMESTAMP NOT NULL DEFAULT now()       
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE incomes;`);
  }
}
