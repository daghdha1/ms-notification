import { Inject } from '@nestjs/common'
import { MongoRepository, Provider } from 'pkg-shared'
import { MongoClient } from 'mongodb'
import { WhatsappException } from '@Whatsapp/domain/exception/Whatsapp.exception'
import { WhatsappConstants } from '@Whatsapp/whatsapp.constants'
import { WhatsappDbRepository } from '@Whatsapp/domain/repository/WhatsappDb.repository'

export class WhatsappDbMongoRepository extends MongoRepository implements WhatsappDbRepository {
  constructor(
    @Inject(Provider.Mongo)
    protected pool: MongoClient
  ) {
    super(pool, { debug: false })
  }

  public async saveDhlTrackingEvent(event: any): Promise<boolean> {
    const db = (await this.pool.connect()).db(WhatsappConstants.MONGO_NOTIFICATION_WHATSAPP_DB)
    const cursor = await db.collection(WhatsappConstants.MONGO_NOTIFICATION_WHATSAPP_COL).insertOne(event)
    if (!cursor.acknowledged) throw new WhatsappException('WhatsappMongoRepository error')
    return true
  }
}
