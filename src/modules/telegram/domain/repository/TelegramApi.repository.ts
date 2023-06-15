export abstract class TelegramApiRepository {
  public abstract sendMessageToUser(chatId: number, msgData: string): Promise<boolean>
}
