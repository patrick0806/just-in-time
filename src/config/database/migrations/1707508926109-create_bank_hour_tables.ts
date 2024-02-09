import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBankHourTables1707508926109 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE bank_hours (
            id uuid DEFAULT uuid_generate_v4() PRIMARY KEY, 
            required_hours integer NOT NULL,
            over_time_hours interval NOT NULL DEFAULT '0',
            employee_id uuid NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY (employee_id) REFERENCES employees(id)
        );
        `);

    await queryRunner.query(`
        CREATE TABLE hour_appointments (
            id uuid DEFAULT uuid_generate_v4() PRIMARY KEY, 
            employee_id uuid NOT NULL,
            apointment_time timestamp NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY (employee_id) REFERENCES employees(id)
        );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE bank_hours;`);
    await queryRunner.query(`DROP TABLE hour_appointments;`);
  }
}
