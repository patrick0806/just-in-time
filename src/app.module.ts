import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [path.join(__dirname, '**', '*.entity.{ts,js}')],
      migrations: ['./config/database/migrations/*.{ts,js}'],
      synchronize: false,
      logging: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
