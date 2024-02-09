import { ApiProperty } from '@nestjs/swagger';
import { EmployeeRoles } from '@shared/enums/employeeRoles.enum';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class CreateEmployeeRequestDTO {
  @IsString()
  @ApiProperty({ example: 'John Doe' })
  name: string;

  @IsEmail()
  @ApiProperty({ example: 'jhondoe@example.com' })
  email: string;

  @IsStrongPassword()
  @ApiProperty({ example: 'pdBg*>9-$fsEu#bUAP[+c!e@' })
  password: string;

  @IsString()
  @ApiProperty({ example: '5f8e1c7d-6f9a-4f6e-9f5c-8d7a6b5c4d8f' })
  companyId: string;

  @IsString()
  @ApiProperty({ example: '9999999999' })
  phoneNumber: string;

  @IsString()
  @ApiProperty({ example: EmployeeRoles.USER, enum: EmployeeRoles })
  role: string;
}
