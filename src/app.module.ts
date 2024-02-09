import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import path from 'path';
import { CompaniesModule } from './module/companies/companies.module';
import { APP_GUARD, RouterModule } from '@nestjs/core';
import { EmployeesModule } from './module/employees/employees.module';
import { AuthModule } from './module/auth/auth.module';
import { AuthGuard } from '@shared/guard/auth.guard';

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
    AuthModule,
    CompaniesModule,
    EmployeesModule,
    RouterModule.register([
      {
        module: AuthModule,
        path: '/auth',
      },
      {
        module: CompaniesModule,
        path: '/enterprises',
      },
      {
        module: EmployeesModule,
        path: '/employees',
      },
    ]),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
