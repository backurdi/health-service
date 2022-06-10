import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Doctor } from '../doctor/doctor.schema';
import validator from 'validator';
import { CheckIn } from '../check-in/check-in.schema';

export type PatientDocument = Patient & Document;

@Schema({
  timestamps: true,
})
export class Patient {
  @Prop({
    type: String,
    required: [true, 'Please tell us your name!'],
  })
  name: string;

  @Prop()
  photo: string;

  @Prop({
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  })
  password: string;

  @Prop({
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
  })
  passwordConfirm: string;

  @Prop({ type: 'date' })
  passwordChangedAt: number;

  @Prop()
  passwordResetToken: string;

  @Prop({ type: 'date' })
  passwordResetExpires: number;

  @Prop({
    default: true,
    select: false,
  })
  active: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true })
  doctor: Doctor;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'CheckIn', default: [] })
  checkIns: CheckIn;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
