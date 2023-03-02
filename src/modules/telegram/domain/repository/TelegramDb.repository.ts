export abstract class TelegramDbRepository {
  public abstract saveDhlTrackingEvent(event: any): Promise<boolean>;
}
