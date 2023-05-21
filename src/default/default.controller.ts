import { Body, Controller, Get, Post } from '@nestjs/common';
import { DefaultService } from './default.service';

@Controller()
export class DefaultController {
  constructor(private readonly appService: DefaultService) {}

  @Post('/send')
  async send(@Body() message: any) {
    return this.appService.send(message);
  }
}
