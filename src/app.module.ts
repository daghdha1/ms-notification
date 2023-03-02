import { Global, Module } from '@nestjs/common';
import { TelegramModule } from '@Telegram/telegram.module';
import { Provider } from 'pkg-shared';
import {
  convertEnvToBoolean,
  MongoProvider,
  MysqlProvider,
  RedisProvider,
} from 'pkg-shared';

@Global()
@Module({
  imports: [TelegramModule],
  controllers: [],
  providers: [
    {
      provide: Provider.MySQL,
      useFactory: async () => {
        if (!convertEnvToBoolean(process.env.MYSQL_ACTIVE)) return null;
        return MysqlProvider({
          name: Provider.MySQL.toString(),
          host: process.env.MYSQL_HOST,
          port: Number(process.env.MYSQL_PORT),
          database: process.env.MYSQL_DATABASE,
          user: process.env.MYSQL_USER,
          password: process.env.MYSQL_PASSWORD,
          maxConnections: Number(process.env.MYSQL_MAX_CONNECTIONS),
          minConnections: Number(process.env.MYSQL_MIN_CONNECTIONS),
        });
      },
    },
    {
      provide: Provider.Mongo,
      useFactory: async () => {
        if (!convertEnvToBoolean(process.env.MONGO_ACTIVE)) return null;
        return MongoProvider({
          name: Provider.Mongo.toString(),
          host: process.env.MONGO_HOST,
          port: Number(process.env.MONGO_PORT),
          database: process.env.MONGO_DATABASE,
          user: process.env.MONGO_USER,
          password: process.env.MONGO_PASSWORD,
          maxPoolSize: Number(process.env.MONGO_MAX_POOL_SIZE),
          minPoolSize: Number(process.env.MONGO_MIN_POOL_SIZE),
        });
      },
    },
    {
      provide: Provider.Redis,
      useFactory: async () => {
        if (!convertEnvToBoolean(process.env.REDIS_ACTIVE)) return null;
        return RedisProvider();
      },
    },
  ],
  exports: [Provider.MySQL, Provider.Mongo, Provider.Redis],
})
export class AppModule {}
