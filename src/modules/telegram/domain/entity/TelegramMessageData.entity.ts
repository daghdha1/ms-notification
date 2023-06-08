import { partialAssign, toMysqlDate } from 'pkg-shared'
import { TelegramMessageDataType } from '../types/TelegramNotification.type'

export class TelegramMessageData {
  event: string
  eventId: string
  date: string
  courier: string
  trackingNumber: string
  trackingLink: string
  orderNo: string
  language: string
  email: string
  recipient: string
  recipientNotification: string

  public static create(data: TelegramMessageDataType): TelegramMessageData {
    return partialAssign(new this(), {
      event: data.event,
      eventId: data.eventId,
      date: toMysqlDate(new Date(Date.now())),
      courier: data.courier,
      trackingNumber: data.trackingNumber,
      trackingLink: data.trackingLink,
      orderNo: data.orderNo,
      language: data.language,
      email: data.email,
      recipient: data.recipient,
      recipientNotification: data.recipientNotification
    })
  }
}
