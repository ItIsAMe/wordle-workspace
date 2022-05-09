import { Controller, Get } from '@nestjs/common';

import { Message } from '@wordle-workspace/api-interfaces';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('check')
  getData(): Message {
    return this.appService.getData();
  }
}
