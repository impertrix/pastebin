import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PasteDocument = Paste & Document;

@Schema()
export class Paste {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  content: string;
}

export const PasteSchema = SchemaFactory.createForClass(Paste);
