import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsString } from 'class-validator';

export class CreateCompanyRequestDTO {
  @IsString()
  @ApiProperty({ example: 'Junk food company', required: true })
  name: string;

  @IsNumberString()
  @ApiProperty({ example: '36212983000177', required: true })
  cnpj: string;
}
