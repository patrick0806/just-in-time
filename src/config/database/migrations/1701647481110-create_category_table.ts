import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCategoryTable1701647481110 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE categories (
            id SERIAL NOT NULL PRIMARY KEY,
            description VARCHAR(30) NOT NULL,
            type VARCHAR(30) NOT NULL  
          );
        `);

    await queryRunner.query(`
    ALTER TABLE expenses DROP COLUMN category;
    ALTER TABLE expenses ADD COLUMN category_id INT REFERENCES categories(id);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE categories;`);
    await queryRunner.query(`
    ALTER TABLE expenses DROP COLUMN category_id;
    ALTER TABLE expenses ADD COLUMN category VARCHAR(50);
    `);
  }
}
