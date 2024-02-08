import 'dotenv/config';
import { DataSource } from 'typeorm';

const config = {
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
};

export const connectionSource = new DataSource({
  type: 'postgres',
  host: config.host,
  port: config.port ? parseInt(config.port) : 5432,
  username: config.username,
  password: config.password,
  database: config.database,
  synchronize: false,
  logging: false,
  entities: ['src/shared/repositories/models/**/*{.ts,.js}'],
  migrations: ['src/config/database/migrations/*{.ts,.js}'],
});
