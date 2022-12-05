import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule} from '@nestjs/config';
import {ormconfig} from "ormconfig";
import {CryptoModule} from "./crypto/crypto.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig[0]),
    ConfigModule.forRoot({isGlobal: true}),
    CryptoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
  }
}
