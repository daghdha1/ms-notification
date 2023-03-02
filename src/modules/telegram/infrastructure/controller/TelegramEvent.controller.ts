import { Body, Controller, Post } from '@nestjs/common';
import { BaseHttpResponse } from 'pkg-shared';

@Controller('telegram')
export class TelegramEventController extends BaseHttpResponse {
  constructor() {
    super();
  }

  // TODO: add guard with ip whitelist
  @Post('mockup')
  public async mockup(@Body() dto: any): Promise<any> {
    return true;
  }
}
