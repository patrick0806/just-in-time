import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Employee } from '@shared/entities/employee.entity';
import { Queue } from 'bull';

@Injectable()
export class SendMailProducerService {
  constructor(@InjectQueue('sendMail') private sendMailQueue: Queue) {}

  async sendMail(data: Employee) {
    await this.sendMailQueue.add('createdEmployeeSendEmailJob', data);
  }
}
