import { TelegramException } from '@Telegram/domain/exception/Telegram.exception'
import { TelegramConstants } from '@Telegram/telegram.constants'
import { Inject, Injectable } from '@nestjs/common'
import * as TelegramBot from 'node-telegram-bot-api'

@Injectable()
export class TelegramConfigureBotParamsService {
  constructor(@Inject(TelegramConstants.NOTIFICATION_PROVIDER) private readonly bot: TelegramBot) {}

  public run() {
    this.bot.on('message', async (msg) => {
      await this.onReceiveMessage(msg)
    })
    this.bot.on('polling_error', (error) => {
      throw new TelegramException(error.message)
    })
    this.bot.onText(/^\/start/, async (msg) => {
      const chatId = msg.chat.id
      const nameUser = msg.from.first_name
      await this.bot.sendMessage(chatId, `El usuario ${nameUser} ha enviado el comando /start`)
    })
  }

  private async onReceiveMessage(msg: TelegramBot.Message) {
    await this.bot.sendMessage(
      msg.chat.id,
      'No se puede establecer comunicación directa con TrackingLabBot, solo es posible recibir información sobre trackings'
    )
  }
}
