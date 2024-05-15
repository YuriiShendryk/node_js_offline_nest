import { Module } from '@nestjs/common';
import { MailingService } from './services/mailing.service';
import { MailingProvider } from './providers/mailing.provider';

@Module({
  providers: [MailingService, MailingProvider],
  exports: [MailingService],
})
export class MailingModule {}
