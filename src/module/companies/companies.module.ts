import { Module } from '@nestjs/common';
import { CreateCompanyController } from './contexts/createCompany/createCompany.controller';
import { CreateCompanyService } from './contexts/createCompany/createCompany.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from '@shared/entities/company.entity';
import { CompanyRepository } from '@shared/repositories/company.repository';
import { FindCompanyByIdController } from './contexts/findCompanyByID/findCompanyById.controller';
import { FindCompanyByIdService } from './contexts/findCompanyByID/findCompanyById.service';

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  controllers: [CreateCompanyController, FindCompanyByIdController],
  providers: [CreateCompanyService, FindCompanyByIdService, CompanyRepository],
})
export class CompaniesModule {}
