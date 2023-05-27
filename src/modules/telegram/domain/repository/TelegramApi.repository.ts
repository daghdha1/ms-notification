import { TelegramMessageData } from '../entity/TelegramMessageData.entity'

export abstract class TelegramApiRepository {
  public abstract sendMessageToUser(chatId: number, msgData: TelegramMessageData): Promise<boolean>
}
