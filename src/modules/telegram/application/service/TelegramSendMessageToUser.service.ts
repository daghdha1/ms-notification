import { TelegramApiRepository } from '@Telegram/domain/repository/TelegramApi.repository'
import { Injectable } from '@nestjs/common'
import { TrackingStatusCreatedEvent } from 'pkg-shared'
import { TelegramMessageData } from '@Telegram/domain/entity/TelegramMessageData.entity'

@Injectable()
export class TelegramSendMessageToUserService {
  constructor(private readonly apiRepo: TelegramApiRepository) {}

  public async run(dto: TrackingStatusCreatedEvent): Promise<boolean> {
    const msgData: TelegramMessageData = TelegramMessageData.create(dto)
    const chatId = Number(dto.phone)
    const title = 'Actualización de seguimiento:\n'
    await this.apiRepo.sendMessageToUser(chatId, title, this.prepareTelegramMessage(msgData))
    return true
  }

  private prepareTelegramMessage(msgData: TelegramMessageData): string {
    const message = `Evento: ${msgData.event}🚚\nID de evento: ${msgData.eventId}\nFecha: ${msgData.date}\nCourier: ${msgData.courier}\nNúmero de seguimiento: ${msgData.trackingNumber}\nEnlace de seguimiento: ${msgData.trackingLink}\nNúmero de orden: ${msgData.orderNo}\nIdioma: ${msgData.language}\nCorreo electrónico: ${msgData.email}\nDestinatario: ${msgData.recipient}\nNotificación de destinatario: ${msgData.recipientNotification}`
    return message.trim()
  }
}
