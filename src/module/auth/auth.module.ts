import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeRepository } from '@shared/repositories/employee.repository';
import { LoginController } from './contexts/login/login.controller';
import { LoginService } from './contexts/login/login.service';
import { Employee } from '@shared/entities/employee.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee]),
    JwtModule.register({
      global: true,
    }),
  ],
  controllers: [LoginController],
  providers: [LoginService, EmployeeRepository],
})
export class AuthModule {}
