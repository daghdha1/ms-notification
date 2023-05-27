import { WhatsappSendMessageToUserService } from '@Whatsapp/application/service/WhatsappSendMessageToUser.service'
import { WhatsappConstants } from '@Whatsapp/whatsapp.constants'
import { Body, Controller, Post } from '@nestjs/common'
import { EventPattern, Payload } from '@nestjs/microservices'
import { TrackingStatusCreatedEvent } from 'pkg-shared'

@Controller('whatsapp')
export class WhatsappEventController {
  constructor(private readonly sendMessageService: WhatsappSendMessageToUserService) {}

  @EventPattern(process.env.KAFKA_TRACKING_CARRIER_TOPIC)
  public trackingCarrierEventCreated(@Payload() dto: TrackingStatusCreatedEvent) {
    if (dto.notificationPlatform.includes(WhatsappConstants.NOTIFICATION_PLATFORM_NAME))
      this.sendMessageService.run(dto)

    return true
  }

  @Post('test')
  public test(@Body() dto: any) {
    //testing
    console.log('pasa por el test')
    this.sendMessageService.run(dto)
    return true
  }
}
