import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { PasteService } from './paste.service';
import { PasteController } from './paste.controller';
import { Paste, PasteSchema } from '../schemas/paste.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuditMiddleware } from 'src/audit.middleware';
@Module({
  controllers: [PasteController],
  providers: [PasteService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Paste.name,
        schema: PasteSchema,
      },
    ]),
    CacheModule.register(),
  ],
})
export class PasteModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuditMiddleware).forRoutes(PasteController);
  }
}
