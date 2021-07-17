import { Module, CacheModule } from '@nestjs/common';
import { PasteModule } from './paste/paste.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    PasteModule,
    MongooseModule.forRoot(process.env.MONGO_URI),
    CacheModule.register(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
