import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePasteDto } from './dto/create-paste.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Paste, PasteDocument } from '../schemas/paste.schema';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Cache } from 'cache-manager';
@Injectable()
export class PasteService {
  constructor(
    @InjectModel(Paste.name) private PasteModel: Model<PasteDocument>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  async create(createPasteDto: CreatePasteDto) {
    const id = this.generateUUID();
    const createdPaste = new this.PasteModel({
      name: id,
      description: createPasteDto.description,
      content: createPasteDto.content,
    });
    await createdPaste.save();
    // insert the content into cache as well
    await this.cacheManager.set(`${id}-content`, createPasteDto.content);
    await this.cacheManager.set(
      `${id}-description`,
      createPasteDto.description,
    );
    return { name: id };
  }

  findAll() {
    return this.PasteModel.find().exec();
  }

  async findOne(name: string) {
    const cachedContent = await this.cacheManager.get(`${name}-content`);
    const cachedDescription = await this.cacheManager.get(
      `${name}-description`,
    );
    if (cachedContent && cachedDescription) {
      return {
        content: cachedContent,
        description: cachedDescription,
      };
    }
    const results = await this.PasteModel.find({ name: name }).exec();
    if (!results || !results[0]) {
      throw new NotFoundException('can not find the paste model');
    }
    await this.cacheManager.set(`${name}-content`, results[0].content);
    await this.cacheManager.set(`${name}-description`, results[0].description);
    return {
      description: results[0].description,
      content: results[0].content,
    };
  }

  generateUUID() {
    return uuidv4();
  }
}
