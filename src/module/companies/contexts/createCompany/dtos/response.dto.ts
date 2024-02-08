import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyResponseDTO {
  @ApiProperty({
    type: String,
    example: 'ff039085-5e16-4d74-9039-4225533e1f35',
  })
  id: string;

  @ApiProperty({
    type: String,
    example: 'Junk food company',
  })
  name: string;

  @ApiProperty({ example: '36212983000177', required: true })
  cnpj: string;

  @ApiProperty({ example: '2021-07-09T00:00:00.000Z' })
  createdAt: string;

  @ApiProperty({ example: '2021-07-09T00:00:00.000Z' })
  updatedAt: string;
}
