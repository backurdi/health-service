import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Patient } from '../patient/patient.schema';

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

  @Prop({ default: 'improving' })
  status: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  })
  patient: Patient;
}

export const CheckInSchema = SchemaFactory.createForClass(CheckIn);
