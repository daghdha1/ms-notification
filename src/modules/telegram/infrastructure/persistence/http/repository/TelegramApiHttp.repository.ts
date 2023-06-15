import { TelegramApiRepository } from '@Telegram/domain/repository/TelegramApi.repository'
import { TelegramConstants } from '@Telegram/telegram.constants'
import { Inject } from '@nestjs/common'
import * as TelegramBot from 'node-telegram-bot-api'

export class TelegramApiHttpRepository implements TelegramApiRepository {
  constructor(@Inject(TelegramConstants.NOTIFICATION_PROVIDER) private readonly bot: TelegramBot) {}
  public async sendMessageToUser(chatId: number, msgData: string): Promise<boolean> {
    await this.bot.sendMessage(chatId, msgData, { parse_mode: 'Markdown', disable_web_page_preview: true })
    return true
  }
}
