import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from '@shared/entities/company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyRepository {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async create({ name, cnpj }: Partial<Company>): Promise<Company> {
    return this.companyRepository.save({ name, cnpj });
  }

  async findByCNPJ(cnpj: string): Promise<Company> {
    return this.companyRepository.findOneBy({ cnpj });
  }
}
