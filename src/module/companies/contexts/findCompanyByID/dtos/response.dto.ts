import { ApiProperty } from '@nestjs/swagger';

export class FindCompanyByIdResponseDTO {
  @ApiProperty({ example: 'a10cac0d-4aec-4c69-a727-76e47c1032b4' })
  id: string;

  @ApiProperty({ example: 'Junk food companys' })
  name: string;

  @ApiProperty({ example: '36212983000177' })
  cnpj: string;

  @ApiProperty({ example: '2022-08-17T00:00:00.000Z' })
  createdAt: string;

  @ApiProperty({ example: '2022-08-17T00:00:00.000Z' })
  updatedAt: string;
}
