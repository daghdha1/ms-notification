export abstract class TelegramApiRepository {
  public abstract syncDhlTracking(tracking: any): Promise<boolean>;
}
