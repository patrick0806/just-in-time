import { Module } from '@nestjs/common';
import { CreateEmployeeController } from './contexts/createEmployee/createEmploy.controller';
import { CreateEmployeeService } from './contexts/createEmployee/creaEmployee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '@shared/entities/employee.entity';
import { EmployeeRepository } from '@shared/repositories/employee.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  controllers: [CreateEmployeeController],
  providers: [CreateEmployeeService, EmployeeRepository],
})
export class EmployeesModule {}
