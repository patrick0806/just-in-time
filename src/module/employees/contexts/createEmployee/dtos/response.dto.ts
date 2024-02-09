import { ApiProperty } from '@nestjs/swagger';
import { EmployeeRoles } from '@shared/enums/employeeRoles.enum';

export class CreateEmployeeResponseDTO {
  @ApiProperty({ example: '5f8e1c7d-6f9a-4f6e-9f5c-8d7a6b5c4d8f' })
  id: string;

  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: 'jhondoe@example.com' })
  email: string;

  @ApiProperty({ example: '5f8e1c7d-6f9a-4f6e-9f5c-8d7a6b5c4d8f' })
  companyId: string;

  @ApiProperty({ example: '9999999999' })
  phoneNumber: string;

  @ApiProperty({ example: EmployeeRoles.USER })
  role: string;

  @ApiProperty({ example: '2022-01-01T00:00:00.000Z' })
  createdAt: string;

  @ApiProperty({ example: '2022-01-01T00:00:00.000Z' })
  updatedAt: string;
}
