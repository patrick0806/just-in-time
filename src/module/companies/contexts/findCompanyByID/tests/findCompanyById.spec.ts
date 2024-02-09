import { Test } from '@nestjs/testing';

import { describe, beforeEach, expect, vi, it } from 'vitest';
import { CompanyRepository } from '@shared/repositories/company.repository';
import { params } from './mocks/params.mock';
import { repositoryMockResponse } from './mocks/repository.mock';
import { FindCompanyByIdController } from '../findCompanyById.controller';
import { FindCompanyByIdService } from '../findCompanyById.service';
import { NotFoundException } from '@shared/exceptions/NotFoundException';
import { HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@shared/guard/auth.guard';

describe('Create company', () => {
  let controller: FindCompanyByIdController;
  let service: FindCompanyByIdService;
  let repository: CompanyRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [FindCompanyByIdController],
      providers: [
        FindCompanyByIdService,
        {
          provide: CompanyRepository,
          useValue: {
            findById: vi.fn(),
          },
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(true)
      .compile();

    controller = module.get<FindCompanyByIdController>(
      FindCompanyByIdController,
    );
    service = module.get<FindCompanyByIdService>(FindCompanyByIdService);
    repository = module.get<CompanyRepository>(CompanyRepository);
  });

  it('Context find company should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('Should be find a company with success and return', async () => {
    vi.spyOn(repository, 'findById').mockResolvedValue(repositoryMockResponse);
    const response = await controller.handle(params.companyId);

    expect(repository.findById).toBeCalledTimes(1);
    expect(repository.findById).toBeCalledWith(params.companyId);

    expect(response).toEqual({
      ...repositoryMockResponse,
      createdAt: repositoryMockResponse.createdAt.toISOString(),
      updatedAt: repositoryMockResponse.updatedAt.toISOString(),
    });
  });

  it('Should be not found a company and throw not found exception', async () => {
    vi.spyOn(repository, 'findById').mockResolvedValue(null);
    try {
      await controller.handle(params.companyId);
    } catch (error: NotFoundException | any) {
      expect(repository.findById).toBeCalledTimes(1);
      expect(repository.findById).toBeCalledWith(params.companyId);

      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.status).toBe(HttpStatus.NOT_FOUND);
      expect(error.response.title).toBe('Resource not found');
      expect(error.response.message).toBe('Company not found');
    }
  });
});
