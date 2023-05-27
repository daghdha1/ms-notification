import { Inject, Module, OnModuleInit } from '@nestjs/common'
import { convertEnvToBoolean, KafkaModule, Provider } from 'pkg-shared'
import { ClientKafka } from '@nestjs/microservices'
import { WhatsappSendMessageToUserService } from './application/service/WhatsappSendMessageToUser.service'
import { WhatsappEventController } from './infrastructure/controller/WhatsappEvent.controller'
import { WhatsappDbMongoRepository } from './infrastructure/persistence/database/mongo/repository/WhatsappDbMongo.repository'
import { WhatsappDbRepository } from './domain/repository/WhatsappDb.repository'
import { WhatsappApiRepository } from './domain/repository/WhatsappApi.repository'
import { WhatsappApiHttpRepository } from './infrastructure/persistence/http/repository/WhatsappApiHttp.repository'

@Module({
  imports: [KafkaModule],
  controllers: [WhatsappEventController],
  providers: [
    WhatsappSendMessageToUserService,
    {
      provide: WhatsappDbRepository,
      useClass: WhatsappDbMongoRepository
    },
    {
      provide: WhatsappApiRepository,
      useClass: WhatsappApiHttpRepository
    }
  ],
  exports: []
})
export class WhatsappModule implements OnModuleInit {
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
