import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type SuggestionModel = Suggestion & Document;

@Schema({
  timestamps: true,
})
export class Suggestion {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ type: String, enum: ['training', 'medication'] })
  type: string;
}

export const SuggestionSchema = SchemaFactory.createForClass(Suggestion);
