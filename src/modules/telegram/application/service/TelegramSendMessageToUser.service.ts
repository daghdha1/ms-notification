/* eslint-disable @typescript-eslint/no-var-requires */
import { TelegramApiRepository } from '@Telegram/domain/repository/TelegramApi.repository'
import { Injectable, OnModuleInit } from '@nestjs/common'
import * as TelegramBot from 'node-telegram-bot-api'
import { TrackingStatusCreatedEvent } from 'pkg-shared'

@Injectable()
export class TelegramSendMessageToUserService implements OnModuleInit {
  constructor(private readonly api: TelegramApiRepository) {}

  private bot: TelegramBot

  public async run(dto: TrackingStatusCreatedEvent): Promise<boolean> {
    // map to entity
    // call http repo to send message
    this.bot.sendMessage('', 'he recibido tu llamada desde la api')
    return true
  }

  onReceiveMessage = (msg: TelegramBot.Message) => {
    console.log('este es el mensaje recibido')
    console.log(msg)
  }

  onModuleInit() {
    this.bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
      polling: true
    })
    this.bot.on('message', this.onReceiveMessage)
    this.bot.on('polling_error', function (error) {
      console.log(error)
    })
    this.bot.onText(/^\/start/, function (msg) {
      const chatId = msg.chat.id
      const nameUser = msg.from.first_name

      this.bot.sendMessage(chatId, 'Bienvenido a mi bot ' + nameUser)
    })
  }
}
