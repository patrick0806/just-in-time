import { Company } from '@shared/entities/company.entity';
import { EmployeeRoles } from '@shared/enums/employeeRoles.enum';

const company: Company = {
  id: 'aa10cac0d-4aec-4c69-a727-76e47c1032b4',
  name: 'Company Junk food',
  cnpj: '12345678901234',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const repositoryMockResponse = {
  id: 'a10cac0d-4aec-4c69-a727-76e47c1032b4',
  name: 'Jhon Doe',
  email: 'johndoe@test.com',
  password: '$3o3iry8qorlqa',
  company,
  phoneNumber: '19993912304',
  role: EmployeeRoles.USER,
  createdAt: new Date(),
  updatedAt: new Date(),
};
