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
  password: '$2b$10$bKf8lgwmBoEh6NYeZ6uV.eE0KoF2BMWXUYZ2F33NrXnfxuOHfysJK',
  company,
  phoneNumber: '19993912304',
  role: EmployeeRoles.USER,
  createdAt: new Date(),
  updatedAt: new Date(),
};
