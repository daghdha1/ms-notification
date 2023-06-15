import { TelegramSendMessageToUserService } from '@Telegram/application/service/TelegramSendMessageToUser.service'
import { TelegramConstants } from '@Telegram/telegram.constants'
import { Body, Controller, Post } from '@nestjs/common'
import { TrackingStatusCreatedEvent } from 'pkg-shared'

@Controller('telegram')
export class TelegramEventController {
  constructor(private readonly sendMessageService: TelegramSendMessageToUserService) {}

  @Post('notification/message')
  public async sendMessageToUser(@Body() dto: TrackingStatusCreatedEvent) {
    if (
      dto.notificationPlatform.find((value) => value.toLowerCase() === TelegramConstants.NOTIFICATION_PLATFORM_NAME)
    ) {
      await this.sendMessageService.run(dto)
    }
    return true
  }
}
