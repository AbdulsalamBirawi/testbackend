import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AddressService } from './modules/address/address.service';
import { Address } from './modules/address/address.entity';
import { BullModule } from '@nestjs/bull';
import { EmailConsumer } from './modules/workers/emails.consumer';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: (() => {
        console.log(process.env);
        return process.env.DB_HOST;
      })(),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      entities: [Address],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Address]),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT,
      },
    }),
    BullModule.registerQueue({
      name: 'emails',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AddressService, EmailConsumer],
})
export class AppModule {}
