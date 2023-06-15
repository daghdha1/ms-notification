import { TelegramApiRepository } from '@Telegram/domain/repository/TelegramApi.repository'
import { Injectable } from '@nestjs/common'
import { TrackingStatusCreatedEvent } from 'pkg-shared'
import { TelegramMessageData } from '@Telegram/domain/entity/TelegramMessageData.entity'

@Injectable()
export class TelegramSendMessageToUserService {
  constructor(private readonly apiRepo: TelegramApiRepository) {}

  public async run(dto: TrackingStatusCreatedEvent): Promise<boolean> {
    const chatId = Number(dto.phone)
    const msgData: TelegramMessageData = TelegramMessageData.create(dto)
    const result: boolean = await this.apiRepo.sendMessageToUser(chatId, this.prepareTelegramMessage(msgData))
    return result
  }

  public prepareTelegramMessage(msgData: TelegramMessageData): string {
    let greeting = msgData.recipientNotification
      ? `¡Hola ${msgData.recipientNotification}! 🙋‍♂️`
      : `¡Hola ${msgData.recipient}! 🙋‍♂️`
    greeting += '\nAquí tiene la información de su 📦\n'
    const farewell =
      '\nEsto es un mensaje generado automáticamente, para cualquier consulta sobre el estado de su pedido, por favor, contacte con el vendedor, !gracias!.'

    const trackingInfo = [
      greeting,
      `Estado: ${msgData.event} 🚚`,
      `Actualizado: ${msgData.date}`,
      `Transportista: ${msgData.courier}`,
      `Número de seguimiento: ${msgData.trackingNumber}`,
      `Enlace de seguimiento: 🔗 ${msgData.trackingLink}`,
      `Número de pedido: ${msgData.orderNo}`,
      farewell
    ]

    const message = trackingInfo.join('\n')
    return message.trim()
  }
}
