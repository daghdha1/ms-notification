import { WhatsappApiRepository } from '@Whatsapp/domain/repository/WhatsappApi.repository'
import { Injectable, OnModuleInit } from '@nestjs/common'
import { TrackingStatusCreatedEvent } from 'pkg-shared'

@Injectable()
export class WhatsappSendMessageToUserService implements OnModuleInit {
  constructor(private readonly api: WhatsappApiRepository) {}

  private bot: any

  onModuleInit() {
    return true
  }

  public async run(dto: TrackingStatusCreatedEvent): Promise<boolean> {
    // map to entity
    // call http repo to send message
    return true
  }
}
