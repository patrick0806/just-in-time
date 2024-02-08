import { Injectable } from '@nestjs/common';
import { CreateCompanyRequestDTO } from './dtos/request.dto';
import { CreateCompanyResponseDTO } from './dtos/response.dto';
import { validCNPJ } from '@shared/utils/validCNPJ.util';
import { BussinesException } from '@shared/exceptions/BusinessException';
import { CompanyRepository } from '@shared/repositories/company.repository';
import { AlreadExistsException } from '@shared/exceptions/AlreadyExistException';

@Injectable()
export class CreateCompanyService {
  constructor(private companyRepository: CompanyRepository) {}

  async execute(
    companyDTO: CreateCompanyRequestDTO,
  ): Promise<CreateCompanyResponseDTO> {
    const isValifiedCNPJ = validCNPJ(companyDTO.cnpj);
    if (!isValifiedCNPJ) {
      throw new BussinesException('Invalid CNPJ');
    }

    const alreadExistsCompany = await this.companyRepository.findByCNPJ(
      companyDTO.cnpj,
    );

    if (alreadExistsCompany) {
      throw new AlreadExistsException('Company already exists');
    }

    const company = await this.companyRepository.create(companyDTO);

    return {
      id: company.id,
      name: company.name,
      cnpj: company.cnpj,
      createdAt: company.createdAt.toISOString(),
      updatedAt: company.updatedAt.toISOString(),
    };
  }
}
