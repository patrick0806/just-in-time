import { Injectable } from '@nestjs/common';
import { EmployeeRepository } from '@shared/repositories/employee.repository';
import { LoginRequestDTO } from './dots/request.dto';
import { UnauthorizedException } from '@shared/exceptions/UnauthorizedException';
import { comparePassword } from '@shared/utils/hash.util';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
  constructor(
    private employeeRepository: EmployeeRepository,
    private jwtService: JwtService,
  ) {}

  async execute({
    email,
    password,
  }: LoginRequestDTO): Promise<{ accessToken: string }> {
    const user = await this.employeeRepository.findByEmail(email);
    const isPasswordValid = await comparePassword(password, user.password);

    if (!user || !isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
        role: user.role,
      },
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
        secret: process.env.JWT_SECRET,
      },
    );
    return { accessToken };
  }
}
