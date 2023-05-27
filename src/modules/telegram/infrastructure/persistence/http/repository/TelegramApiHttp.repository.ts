import { TelegramMessageData } from '@Telegram/domain/entity/TelegramMessageData.entity'
import { TelegramApiRepository } from '@Telegram/domain/repository/TelegramApi.repository'
import { TelegramConstants } from '@Telegram/telegram.constants'
import { Inject } from '@nestjs/common'
import * as TelegramBot from 'node-telegram-bot-api'

export class TelegramApiHttpRepository implements TelegramApiRepository {
  constructor(@Inject(TelegramConstants.NOTIFICATION_PROVIDER) private readonly bot: TelegramBot) {}
  public async sendMessageToUser(chatId: number, msgData: TelegramMessageData): Promise<boolean> {
    await this.bot.sendMessage(chatId, `Actualización de seguimiento: ${JSON.stringify(msgData)}`)
    return true
  }
}
