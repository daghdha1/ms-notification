import { Inject } from '@nestjs/common';
import { MongoRepository, Provider } from 'pkg-shared';
import { MongoClient } from 'mongodb';
import { TelegramException } from '@Telegram/domain/exception/Telegram.exception';
import { TelegramConstants } from '@Telegram/telegram.constants';
import { TelegramDbRepository } from '@Telegram/domain/repository/TelegramDb.repository';

export class TelegramDbMongoRepository
  extends MongoRepository
  implements TelegramDbRepository
{
  constructor(
    @Inject(Provider.Mongo)
    protected pool: MongoClient,
  ) {
    super(pool, { debug: false });
  }

  public async saveDhlTrackingEvent(event: any): Promise<boolean> {
    const db = (await this.pool.connect()).db(
      TelegramConstants.MONGO_NOTIFICATION_TELEGRAM_DB,
    );
    const cursor = await db
      .collection(TelegramConstants.MONGO_NOTIFICATION_TELEGRAM_COL)
      .insertOne(event);
    if (!cursor.acknowledged)
      throw new TelegramException('TelegramMongoRepository error');
    return true;
  }
}
