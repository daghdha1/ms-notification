import { TelegramSendMessageToUserService } from '@Telegram/application/service/TelegramSendMessageToUser.service'
import { TelegramConstants } from '@Telegram/telegram.constants'
import { Controller } from '@nestjs/common'
import { EventPattern, Payload } from '@nestjs/microservices'
import { TrackingStatusCreatedEvent } from 'pkg-shared'

@Controller()
export class TelegramEventSubscriptor {
  constructor(private readonly sendMessageService: TelegramSendMessageToUserService) {}

  @EventPattern(process.env.KAFKA_TRACKING_CARRIER_TOPIC)
  public async trackingStatusCreatedEvent(@Payload() dto: TrackingStatusCreatedEvent) {
    if (dto.notificationPlatform.find((value) => value.toLowerCase() === TelegramConstants.NOTIFICATION_PLATFORM_NAME))
      await this.sendMessageService.run(dto)
    return true
  }
}
