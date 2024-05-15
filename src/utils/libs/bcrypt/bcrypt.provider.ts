import { Provider } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LibsEnum } from '../../../common/enums/libs.enum';

export const bcryptProvider: Provider = {
  provide: LibsEnum.BCRYPT,
  useValue: bcrypt,
};
