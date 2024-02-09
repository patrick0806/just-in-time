import { Test } from '@nestjs/testing';

import { describe, beforeAll, expect, vi, it } from 'vitest';
import { LoginController } from '../login.controller';
import { LoginService } from '../login.service';
import { HttpStatus } from '@nestjs/common';
import { EmployeeRepository } from '@shared/repositories/employee.repository';
import { repositoryMockResponse } from './mocks/repository.mock';
import { params } from './mocks/params.mock';
import { UnauthorizedException } from '@shared/exceptions/UnauthorizedException';
import { AuthGuard } from '@shared/guard/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

describe('Create company', () => {
  let controller: LoginController;
  let service: LoginService;
  let repository: EmployeeRepository;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      controllers: [LoginController],
      providers: [
        LoginService,
        JwtService,
        {
          provide: EmployeeRepository,
          useValue: {
            create: vi.fn(),
            findByEmail: vi.fn(),
          },
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(true)
      .compile();

    controller = module.get<LoginController>(LoginController);
    service = module.get<LoginService>(LoginService);
    repository = module.get<EmployeeRepository>(EmployeeRepository);
  });

  it('Context auth user should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('Should be login with success', async () => {
    vi.spyOn(repository, 'findByEmail').mockResolvedValue(
      repositoryMockResponse,
    );
    const response = await controller.handle(params.body);

    expect(repository.findByEmail).toBeCalledTimes(1);
    expect(repository.findByEmail).toBeCalledWith(params.body.email);

    expect(response.accessToken).not.toBe(null);
  });

  it('Should be fail if try login with invalid password', async () => {
    vi.spyOn(repository, 'findByEmail').mockResolvedValue(
      repositoryMockResponse,
    );
    params.body.password = 'wrongPassword';
    try {
      await controller.handle(params.body);
    } catch (error: UnauthorizedException | any) {
      expect(repository.findByEmail).toBeCalledTimes(1);
      expect(repository.findByEmail).toBeCalledWith(params.body.email);

      expect(error).toBeInstanceOf(UnauthorizedException);
      expect(error.status).toBe(HttpStatus.UNAUTHORIZED);
      expect(error.response.title).toBe('Unauthorized');
      expect(error.response.message).toBe('Invalid email or password');
    }
  });

  it('Should be fail if try login with invalid email', async () => {
    vi.spyOn(repository, 'findByEmail').mockResolvedValue(null);
    params.body.email = 'invalidEmail@test.com';
    try {
      await controller.handle(params.body);
    } catch (error: UnauthorizedException | any) {
      expect(repository.findByEmail).toBeCalledTimes(1);
      expect(repository.findByEmail).toBeCalledWith(params.body.email);

      expect(error).toBeInstanceOf(UnauthorizedException);
      expect(error.status).toBe(HttpStatus.UNAUTHORIZED);
      expect(error.response.title).toBe('Unauthorized');
      expect(error.response.message).toBe('Invalid email or password');
    }
  });
});
