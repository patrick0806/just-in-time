import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from '@shared/entities/employee.entity';
import { Repository } from 'typeorm';

type CreateEmployee = {
  name: string;
  email: string;
  password: string;
  companyId: string;
  phoneNumber: string;
  role: string;
};

@Injectable()
export class EmployeeRepository {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async create(employData: CreateEmployee): Promise<Employee> {
    return this.employeeRepository.save({
      name: employData.name,
      email: employData.email,
      role: employData.role,
      phoneNumber: employData.phoneNumber,
      password: employData.password,
      company: {
        id: employData.companyId,
      },
    });
  }

  async findByEmail(email: string): Promise<Employee> {
    return this.employeeRepository.findOneBy({ email });
  }
}
