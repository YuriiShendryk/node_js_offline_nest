import { ConfigService } from '@nestjs/config';

import { Provider } from '@nestjs/common';

import * as SendGrid from '@sendgrid/mail';
import { ConfigEnum } from 'src/common/enums/config.enum';
import { AdditionalProvidersEnum } from 'src/common/enums/additional-providers.enum';

export const MailingProvider: Provider = {
  provide: AdditionalProvidersEnum.SENDGRID,
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const apiKey = configService.get(ConfigEnum.SENDGRID_API_KEY);
    return SendGrid.setApiKey(apiKey);
  },
};
