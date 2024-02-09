import { Test } from '@nestjs/testing';

import { describe, beforeEach, expect, vi, it } from 'vitest';
import { CreateCompanyService } from '../createCompany.service';
import { CreateCompanyController } from '../createCompany.controller';
import { CompanyRepository } from '@shared/repositories/company.repository';
import { requestMockDTO } from './mocks/request.mock';
import { repositoryMockResponse } from './mocks/response.mock';
import { HttpStatus } from '@nestjs/common';
import { BussinesException } from '@shared/exceptions/BusinessException';
import { AlreadExistsException } from '@shared/exceptions/AlreadyExistException';
import { AuthGuard } from '@shared/guard/auth.guard';

describe('Create company', () => {
  let controller: CreateCompanyController;
  let service: CreateCompanyService;
  let repository: CompanyRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [CreateCompanyController],
      providers: [
        CreateCompanyService,
        {
          provide: CompanyRepository,
          useValue: {
            create: vi.fn(),
            findByCNPJ: vi.fn(),
          },
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(true)
      .compile();

    controller = module.get<CreateCompanyController>(CreateCompanyController);
    service = module.get<CreateCompanyService>(CreateCompanyService);
    repository = module.get<CompanyRepository>(CompanyRepository);
  });

  it('Context create company should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('Should be create a company with success', async () => {
    vi.spyOn(repository, 'findByCNPJ').mockResolvedValue(null);
    vi.spyOn(repository, 'create').mockResolvedValue(repositoryMockResponse);
    const response = await controller.handle(requestMockDTO);

    expect(repository.findByCNPJ).toBeCalledTimes(1);
    expect(repository.findByCNPJ).toBeCalledWith(requestMockDTO.cnpj);

    expect(repository.create).toBeCalledTimes(1);
    expect(repository.create).toBeCalledWith(requestMockDTO);
    expect(response).toEqual({
      ...repositoryMockResponse,
      createdAt: repositoryMockResponse.createdAt.toISOString(),
      updatedAt: repositoryMockResponse.updatedAt.toISOString(),
    });
  });

  it('Should be fail when cnpj is invalid', async () => {
    vi.spyOn(repository, 'findByCNPJ').mockResolvedValue(null);
    vi.spyOn(repository, 'create').mockResolvedValue(null);
    try {
      await controller.handle({ ...requestMockDTO, cnpj: '36212983000178' });
    } catch (error: BussinesException | any) {
      expect(repository.findByCNPJ).toBeCalledTimes(0);
      expect(repository.create).toBeCalledTimes(0);

      expect(error).toBeInstanceOf(BussinesException);
      expect(error.status).toBe(HttpStatus.BAD_REQUEST);
      expect(error.response.title).toBe('Violation of business rules');
      expect(error.response.message).toBe('Invalid CNPJ');
    }
  });

  it('Should be fail when cnpj is already exists in database', async () => {
    vi.spyOn(repository, 'findByCNPJ').mockResolvedValue(
      repositoryMockResponse,
    );
    vi.spyOn(repository, 'create').mockResolvedValue(null);
    try {
      await controller.handle(requestMockDTO);
    } catch (error: AlreadExistsException | any) {
      expect(repository.findByCNPJ).toBeCalledTimes(1);
      expect(repository.findByCNPJ).toBeCalledWith(requestMockDTO.cnpj);
      expect(repository.create).toBeCalledTimes(0);

      expect(error).toBeInstanceOf(AlreadExistsException);
      expect(error.status).toBe(HttpStatus.CONFLICT);
      expect(error.response.title).toBe('Conflict');
      expect(error.response.message).toBe('Company already exists');
    }
  });
});
