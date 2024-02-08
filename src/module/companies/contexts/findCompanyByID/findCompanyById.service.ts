import { Injectable } from '@nestjs/common';
import { FindCompanyByIdResponseDTO } from './dtos/response.dto';
import { CompanyRepository } from '@shared/repositories/company.repository';
import { NotFoundException } from '@shared/exceptions/NotFoundException';

@Injectable()
export class FindCompanyByIdService {
  constructor(private companyRepository: CompanyRepository) {}

  async execute(companyId: string): Promise<FindCompanyByIdResponseDTO> {
    const company = await this.companyRepository.findById(companyId);
    if (!company) {
      throw new NotFoundException('Company not found');
    }
    return {
      ...company,
      createdAt: company.createdAt.toISOString(),
      updatedAt: company.updatedAt.toISOString(),
    };
  }
}
