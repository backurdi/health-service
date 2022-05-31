import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import validator from 'validator';
import * as mongoose from 'mongoose';
import { Doctor } from '../doctor/doctor.schema';
import { User } from '../user/user.scema';

export type PatientDocument = Patient & Document;

@Schema({
  timestamps: true,
})
export class Patient extends User {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' })
  doctor: Doctor;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
