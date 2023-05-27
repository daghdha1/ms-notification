export abstract class WhatsappApiRepository {
  public abstract sendMessage(data: any): Promise<boolean>
}
