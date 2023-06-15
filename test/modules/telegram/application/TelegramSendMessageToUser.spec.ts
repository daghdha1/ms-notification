import { TelegramApiRepository } from '@Telegram/domain/repository/TelegramApi.repository'
import { TelegramMessageData } from '@Telegram/domain/entity/TelegramMessageData.entity'
import { TrackingStatusCreatedEvent } from 'pkg-shared'
import { TelegramSendMessageToUserService } from '@Telegram/application/service/TelegramSendMessageToUser.service'

describe('TelegramSendMessageToUserService test suite', () => {
  let service: TelegramSendMessageToUserService
  let apiRepoMock: TelegramApiRepository

  beforeEach(() => {
    apiRepoMock = {
      sendMessageToUser: jest.fn().mockResolvedValue(true)
    }
    service = new TelegramSendMessageToUserService(apiRepoMock)
  })

  describe('run', () => {
    it('should send a telegram message to the user', async () => {
      // arrange
      const dto: TrackingStatusCreatedEvent = {
        event: 'onDelivered',
        eventId: '3',
        timestamp: '2023-01-31T16:12:00.000Z',
        courier: 'dhl-spain',
        trackingNumber: '1111-11111',
        language: 'es',
        trackingLink: 'https://www.dhl.es/...?tlcode=1111-11111',
        phone: '2072745433',
        email: 'adrian@gmail.com',
        orderNo: '1093X23D',
        recipientNotification: 'Sr Adrian',
        recipient: 'Adrian',
        notificationPlatform: ['telegram'],
        inQueue: true
      }
      const msgData: TelegramMessageData = {
        recipientNotification: 'Sr Adrian',
        recipient: 'Adrian',
        event: 'En reparto',
        date: '2023-06-09 00:09:59',
        courier: 'dhl-spain',
        trackingNumber: '1111-11111',
        trackingLink: 'https://www.dhl.es/...?tlcode=1111-11111',
        orderNo: '1093X23D'
      }
      const createMock = jest.fn().mockReturnValue(msgData)
      jest.spyOn(TelegramMessageData, 'create').mockImplementation(createMock)

      // act
      const result = await service.run(dto)

      // assert
      expect(result).toBe(true)
      expect(createMock).toBeCalled()
      expect(createMock).toBeCalledTimes(1)
      expect(createMock).toBeCalledWith(dto)
      expect(createMock).toHaveReturnedWith(msgData)
      expect(apiRepoMock.sendMessageToUser).toBeCalledTimes(1)

      // Restore
      jest.spyOn(TelegramMessageData, 'create').mockRestore()
    })
  })

  describe('prepareTelegramMessage', () => {
    it('should prepare the telegram message correctly', () => {
      // arrange
      const msgData: TelegramMessageData = {
        recipientNotification: 'Sr Adrian',
        recipient: 'Adrian',
        event: 'En reparto',
        date: '2023-06-09 00:09:59',
        courier: 'dhl-spain',
        trackingNumber: '1111-11111',
        trackingLink: 'https://www.dhl.es/...?tlcode=1111-11111',
        orderNo: '1093X23D'
      }
      const prepareTelegramMessageSpy = jest.spyOn(service, 'prepareTelegramMessage')

      // act
      service.prepareTelegramMessage(msgData)

      // assert
      expect(prepareTelegramMessageSpy).toBeCalledTimes(1)
      expect(prepareTelegramMessageSpy).toBeCalledWith(msgData)
    })
  })
})
