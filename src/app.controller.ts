import {
  Controller,
  Get,
  Req,
  UseGuards,
  assignMetadata,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('nest_js')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('cool')
  getCool(): string {
    return 'COOL';
  }
}

// /nest_js/cool
