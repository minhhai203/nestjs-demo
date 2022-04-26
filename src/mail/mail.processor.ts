/* eslint-disable prettier/prettier */
import {
  OnQueueActive,
  OnQueueCleaned,
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { MailService } from './mail.service';

@Processor('mailqueue')
export class MailProcessor {
  private readonly logger = new Logger(this.constructor.name);

  constructor(private readonly mailService: MailService) {}

  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processor:@OnQueueActive - Processing job ${job.id} of type ${job.name}.`,
    );
    // . Data: ${JSON.stringify(job.data)}
  }

  @OnQueueCompleted()
  onComplete(job: Job) {
    console.log(
      `Processor:@OnQueueCompleted - Completed job ${job.id} of type ${job.name}.`,
    );
    console.log('---------------------');
  }

  @OnQueueCleaned()
  onClean(job: Job[]) {
    console.log(`Processor:@OnQueueCleaned - Clean ${job.length} job`);
  }

  @OnQueueFailed()
  onError(job: Job<any>, error) {
    console.log(
      `Processor:@OnQueueFailed - Failed job ${job.id} of type ${job.name}: ${error.message}`,
      error.stack,
    );
  }

  @Process('hehe')
  async sendWelcomeEmail(job: Job): Promise<any> {
    try {
      const result = await this.mailService.sendUserConfirmation(job.data);
      return result;
    } catch (error) {
      this.logger.error('Failed to send confirmation email.', error.stack);
      throw error;
    }
  }
}
