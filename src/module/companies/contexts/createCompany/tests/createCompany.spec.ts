import { Test } from '@nestjs/testing';

import { describe, beforeEach, expect, vi, it } from 'vitest';
import { CreateCompanyService } from '../createCompany.service';
import { CreateCompanyController } from '../createCompany.controller';
import { CompanyRepository } from '@shared/repositories/company.repository';
import { requestMockDTO } from './mocks/request.mock';
import { repositoryMockResponse } from './mocks/response.mock';

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
    }).compile();

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

  //it('Should be fail when cnpj is invalid')
});
