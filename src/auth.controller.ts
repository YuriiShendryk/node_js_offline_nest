import { Controller, Get } from '@nestjs/common';

@Controller('auth')
export class AuthControllerNest {
  @Get()
  getAuth() {
    return 'AUTH';
  }
}
