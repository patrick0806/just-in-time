import { EmployeeRoles } from '@shared/enums/employeeRoles.enum';

export const params = {
  body: {
    name: 'Jhon Doe',
    email: 'johndoe@test.com',
    password: '$3o3iry8qorlqa',
    companyId: 'aa10cac0d-4aec-4c69-a727-76e47c1032b4',
    phoneNumber: '19993912304',
    role: EmployeeRoles.USER,
  },
};
