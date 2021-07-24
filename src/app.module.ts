import { Module, CacheModule, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { PasteModule } from './paste/paste.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuditMiddleware } from './audit.middleware';
@Module({
  imports: [
    PasteModule,
    MongooseModule.forRoot(process.env.MONGO_URI),
    CacheModule.register(),
    ThrottlerModule.forRoot({ ttl: 60, limit: 50 }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {

}
