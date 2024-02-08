import { Company } from '@shared/entities/company.entity';
import { randomUUID } from 'crypto';

export const repositoryMockResponse: Company = {
  id: randomUUID(),
  cnpj: '36212983000177',
  name: 'Fake company',
  createdAt: new Date(),
  updatedAt: new Date(),
};
