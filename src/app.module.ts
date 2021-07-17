import { Module, CacheModule } from '@nestjs/common';
import { PasteModule } from './paste/paste.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
@Module({
  imports: [
    PasteModule,
    MongooseModule.forRoot(process.env.MONGO_URI),
    CacheModule.register(),
    ThrottlerModule.forRoot({ttl: 60, limit: 50})
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
