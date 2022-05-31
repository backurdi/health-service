import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type CheckInDocument = CheckIn & Document;

@Schema({
  timestamps: true,
})
export class CheckIn {
  @Prop()
  type: string;

  @Prop()
  done: boolean;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  answers: any;
}

export const CheckInSchema = SchemaFactory.createForClass(CheckIn);
