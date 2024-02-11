import { Module } from '@nestjs/common';
import { CreateEmployeeController } from './contexts/createEmployee/createEmploy.controller';
import { CreateEmployeeService } from './contexts/createEmployee/createEmployee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '@shared/entities/employee.entity';
import { EmployeeRepository } from '@shared/repositories/employee.repository';
import { SendMailProducerService } from '@shared/jobs/sendMail.producer';
import { BullModule } from '@nestjs/bull';
import { SendMailConsumeService } from '@shared/jobs/sendMail.consumer';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee]),
    BullModule.registerQueue({ name: 'sendMail' }),
  ],
  controllers: [CreateEmployeeController],
  providers: [
    CreateEmployeeService,
    SendMailProducerService,
    SendMailConsumeService,
    EmployeeRepository,
  ],
})
export class EmployeesModule {}
