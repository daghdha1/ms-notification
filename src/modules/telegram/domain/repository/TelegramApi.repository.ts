export abstract class TelegramApiRepository {
  public abstract sendMessage(data: any): Promise<boolean>
}
