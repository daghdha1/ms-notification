export abstract class WhatsappDbRepository {
  public abstract saveDhlTrackingEvent(event: any): Promise<boolean>
}
