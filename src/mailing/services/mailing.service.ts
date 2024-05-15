import {
  Inject,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { AdditionalProvidersEnum } from 'src/common/enums/additional-providers.enum';
import { TSendgridTransporter } from '../types/email-transporter.type';
import { ConfigService } from '@nestjs/config';
import { ConfigEnum } from 'src/common/enums/config.enum';
import { MailDataRequired } from '@sendgrid/mail';
import { IReceiver } from '../interfaces/receiver.interface';

@Injectable()
export class MailingService {
  constructor(
    @Inject(AdditionalProvidersEnum.SENDGRID)
    private readonly transporter: TSendgridTransporter,
    private readonly configService: ConfigService,
  ) {}

  private readonly SENDER = this.configService.get(ConfigEnum.EMAIL_SENDER);
  private readonly REGISTRATION_SUBJECT = 'Welcome';

  async send(data: MailDataRequired) {
    try {
      await this.transporter.send(data);
    } catch (error) {
      throw new ServiceUnavailableException(error?.response?.body);
    }
  }

  async sendConfirmRegistration({ email }: IReceiver) {
    const html = `<div><h1>Dear, ${email}</h1> you receive this message because of registration in our awesome application</div>`;
    await this.send({
      from: this.SENDER,
      to: email,
      html,
      subject: this.REGISTRATION_SUBJECT,
    });
  }
}
