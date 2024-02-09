import { Test } from '@nestjs/testing';

import { describe, beforeEach, expect, vi, it } from 'vitest';
import { CreateEmployeeService } from '../createEmployee.service';
import { CreateEmployeeController } from '../createEmploy.controller';
import { HttpStatus } from '@nestjs/common';
import { AlreadExistsException } from '@shared/exceptions/AlreadyExistException';
import { EmployeeRepository } from '@shared/repositories/employee.repository';
import { repositoryMockResponse } from './mocks/repository.mock';
import { params } from './mocks/params.mock';

describe('Create company', () => {
  let controller: CreateEmployeeController;
  let service: CreateEmployeeService;
  let repository: EmployeeRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [CreateEmployeeController],
      providers: [
        CreateEmployeeService,
        {
          provide: EmployeeRepository,
          useValue: {
            create: vi.fn(),
            findByEmail: vi.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CreateEmployeeController>(CreateEmployeeController);
    service = module.get<CreateEmployeeService>(CreateEmployeeService);
    repository = module.get<EmployeeRepository>(EmployeeRepository);
  });

  it('Context create employee should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('Should be create a employ with success', async () => {
    vi.spyOn(repository, 'findByEmail').mockResolvedValue(null);
    vi.spyOn(repository, 'create').mockResolvedValue(repositoryMockResponse);
    const response = await controller.handle(params.body);

    expect(repository.findByEmail).toBeCalledTimes(1);
    expect(repository.findByEmail).toBeCalledWith(params.body.email);

    expect(repository.create).toBeCalledTimes(1);
    expect(repository.create).toBeCalledWith(params.body);
    expect(response.id).not.toBe(null);
    expect(response.name).toBe(params.body.name);
    expect(response.email).toBe(params.body.email);
    expect(response.companyId).toBe(params.body.companyId);
    expect(response.phoneNumber).toBe(params.body.phoneNumber);
    expect(response.role).toBe(params.body.role);
  });

  it('Should be fail when employee already exists in database', async () => {
    vi.spyOn(repository, 'findByEmail').mockResolvedValue(
      repositoryMockResponse,
    );
    vi.spyOn(repository, 'create').mockResolvedValue(null);
    try {
      await controller.handle(params.body);
    } catch (error: AlreadExistsException | any) {
      expect(repository.findByEmail).toBeCalledTimes(1);
      expect(repository.create).toBeCalledTimes(0);

      expect(repository.findByEmail).toBeCalledTimes(1);
      expect(repository.findByEmail).toBeCalledWith(params.body.email);
      expect(repository.create).toBeCalledTimes(0);

      expect(error).toBeInstanceOf(AlreadExistsException);
      expect(error.status).toBe(HttpStatus.CONFLICT);
      expect(error.response.title).toBe('Conflict');
      expect(error.response.message).toBe('Employee already exists');
    }
  });
});
