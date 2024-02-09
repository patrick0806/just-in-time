import { Injectable } from '@nestjs/common';
import { EmployeeRepository } from '@shared/repositories/employee.repository';
import { CreateEmployeeRequestDTO } from './dtos/request.dto';
import { CreateEmployeeResponseDTO } from './dtos/response.dto';
import { AlreadExistsException } from '@shared/exceptions/AlreadyExistException';
import { generateHashPassword } from '@shared/utils/hash.util';

@Injectable()
export class CreateEmployeeService {
  constructor(private employeeRepository: EmployeeRepository) {}

  async execute(
    employData: CreateEmployeeRequestDTO,
  ): Promise<CreateEmployeeResponseDTO> {
    const alreadyExistEmployee = await this.employeeRepository.findByEmail(
      employData.email,
    );

    if (alreadyExistEmployee) {
      throw new AlreadExistsException('Employee already exists');
    }

    const hashPassword = await generateHashPassword(employData.password);
    employData.password = hashPassword;
    //throw new Error('Não é pra cirar agora');
    const createdEmployee = await this.employeeRepository.create(employData);
    return {
      id: createdEmployee.id,
      email: createdEmployee.email,
      name: createdEmployee.name,
      role: createdEmployee.role,
      phoneNumber: createdEmployee.phoneNumber,
      companyId: createdEmployee.company.id,
      createdAt: createdEmployee.createdAt.toISOString(),
      updatedAt: createdEmployee.updatedAt.toISOString(),
    };
  }
}
