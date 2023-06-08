import { TelegramApiRepository } from '@Telegram/domain/repository/TelegramApi.repository'
import { TelegramConstants } from '@Telegram/telegram.constants'
import { Inject } from '@nestjs/common'
import * as TelegramBot from 'node-telegram-bot-api'

export class TelegramApiHttpRepository implements TelegramApiRepository {
  constructor(@Inject(TelegramConstants.NOTIFICATION_PROVIDER) private readonly bot: TelegramBot) {}
  public async sendMessageToUser(chatId: number, title: string, msgData: string): Promise<boolean> {
    await this.bot.sendMessage(chatId, `${title}${msgData}`, { parse_mode: 'Markdown' })
    return true
  }
}
