import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Employee } from '@shared/entities/employee.entity';
import { Job } from 'bull';

@Processor('sendMail')
export class SendMailConsumeService {
  constructor(private mailerService: MailerService) {}

  @Process('createdEmployeeSendEmailJob')
  async sendMailJob(job: Job<Employee>) {
    console.log('Olha o pai sendo processado');
    const { data: employee } = job;
    await this.mailerService.sendMail({
      to: employee.email,
      from: 'Cg3pD@example.com', //sender
      subject: 'Welcome to our platform',
      text: `Olá ${employee.name}! Welcome to our platform. You are registered with success. and you can access the platform now`,
    });
  }
}
