import { TelegramApiRepository } from '@Telegram/domain/repository/TelegramApi.repository'
import { Injectable } from '@nestjs/common'
import { TrackingStatusCreatedEvent } from 'pkg-shared'
import { TelegramMessageData } from '@Telegram/domain/entity/TelegramMessageData.entity'

@Injectable()
export class TelegramSendMessageToUserService {
  constructor(private readonly apiRepo: TelegramApiRepository) {}

  public async run(dto: TrackingStatusCreatedEvent): Promise<boolean> {
    const msgData: TelegramMessageData = TelegramMessageData.create(dto)
    const chatId: number = parseInt(dto.phone)
    await this.apiRepo.sendMessageToUser(chatId, msgData)
    return true
  }
}
