import { TelegramSendMessageToUserService } from '@Telegram/application/service/TelegramSendMessageToUser.service'
import { Body, Controller, Post } from '@nestjs/common'
import { EventPattern, Payload } from '@nestjs/microservices'
import { TrackingStatusCreatedEvent } from 'pkg-shared'

@Controller('telegram')
export class TelegramEventController {
  constructor(private readonly sendMessageService: TelegramSendMessageToUserService) {}

  @EventPattern(process.env.KAFKA_TRACKING_CARRIER_TOPIC)
  public async trackingStatusCreatedEvent(@Payload() dto: TrackingStatusCreatedEvent) {
    console.log(dto)
    await this.sendMessageService.run(dto)
    return true
  }

  @Post('test')
  public async test(@Body() dto: any) {
    console.log('pasa por el test!')
    await this.sendMessageService.run(dto)
    return true
  }
}
