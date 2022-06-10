import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import validator from 'validator';
import { Patient } from '../patient/patient.schema';

export type DoctorDocument = Doctor & Document;

@Schema({
  timestamps: true,
})
export class Doctor {
  @Prop({
    type: String,
    required: [true, 'Please tell us your name!'],
  })
  name: string;

  @Prop({
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  })
  email: string;

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

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Patient', default: [] })
  patients: Patient[];
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
