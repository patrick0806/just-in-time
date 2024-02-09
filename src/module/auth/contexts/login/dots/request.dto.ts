import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginRequestDTO {
  @IsEmail()
  @ApiProperty({ example: 'jhondoe@example.com' })
  email: string;

  @IsString()
  @ApiProperty({ example: 'pdBg*>9-$fsEu#bUAP[+c!e@' })
  password: string;
}
