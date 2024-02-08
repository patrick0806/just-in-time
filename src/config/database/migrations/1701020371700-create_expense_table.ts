import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateExpenseTable1701020371700 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await queryRunner.query(`
      CREATE TABLE expenses (
        id UUID NOT NULL DEFAULT uuid_generate_v4(),
        description VARCHAR(50),
        category VARCHAR(30),
        installments INTEGER NOT NULL DEFAULT 0,
        installment_value NUMERIC(10,2),
        total_value NUMERIC(10,2),
        initial_date DATE, 
        finish_date DATE,
        status VARCHAR(30) NOT NULL,
        payment_method VARCHAR(30) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT now(),
        updated_at TIMESTAMP NOT NULL DEFAULT now()       
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE expenses;`);
    await queryRunner.query(`DROP EXTENSION IF EXISTS "uuid-ossp";`);
  }
}
