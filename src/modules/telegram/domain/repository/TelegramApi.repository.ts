export abstract class TelegramApiRepository {
  public abstract sendMessageToUser(chatId: number, title: string, msgData: string): Promise<boolean>
}
