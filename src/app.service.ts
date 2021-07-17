import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class AppService {
  constructor(@InjectConnection() private readonly connection: Connection) {}
  getHealth(): string {
    if (this.connection.readyState === 1) {
      return 'healthy';
    } else {
      throw new InternalServerErrorException();
    }
  }
}
