import { Inject, Module, OnModuleInit } from '@nestjs/common'
import { convertEnvToBoolean, KafkaModule, Provider } from 'pkg-shared'
import { ClientKafka } from '@nestjs/microservices'
import { TelegramEventController } from './infrastructure/controller/TelegramEvent.controller'
import { TelegramApiRepository } from './domain/repository/TelegramApi.repository'
import { TelegramDbRepository } from './domain/repository/TelegramDb.repository'
import { TelegramDbMongoRepository } from './infrastructure/persistence/database/mongo/repository/TelegramDbMongo.repository'
import { TelegramApiHttpRepository } from './infrastructure/persistence/http/repository/TelegramApiHttp.repository'
import { TelegramSendMessageToUserService } from './application/service/TelegramSendMessageToUser.service'

@Module({
  imports: [KafkaModule],
  controllers: [TelegramEventController],
  providers: [
    TelegramSendMessageToUserService,
    {
      provide: TelegramDbRepository,
      useClass: TelegramDbMongoRepository
    },
    {
      provide: TelegramApiRepository,
      useClass: TelegramApiHttpRepository
    }
  ],
  exports: []
})
export class TelegramModule implements OnModuleInit {
  constructor(@Inject(Provider.KafkaConsumer) private readonly kafkaClient: ClientKafka) {}

  async onModuleInit() {
    if (convertEnvToBoolean(process.env.KAFKA_ACTIVE)) {
      console.log('\x1b[33m%s\x1b[0m', `${Provider.KafkaConsumer} client is connecting`)
      await this.kafkaClient.connect()
      // only with request-response message pattern over kafka
      // this.kafkaClient.subscribeToResponseOf(process.env.KAFKA_AUTH_JWT_TOPIC);
      console.log('\x1b[32m%s\x1b[0m', `${Provider.KafkaConsumer} client connected`)
    }
  }
}
