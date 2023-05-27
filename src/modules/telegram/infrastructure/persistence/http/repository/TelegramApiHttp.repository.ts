import fetch from 'node-fetch'
import { TelegramApiRepository } from '@Telegram/domain/repository/TelegramApi.repository'
import { DhlTrackingModel } from '../model/TelegramCreateMessage.model'

export class TelegramApiHttpRepository implements TelegramApiRepository {
  public async sendMessage(data: any): Promise<boolean> {
    return true
  }
}
