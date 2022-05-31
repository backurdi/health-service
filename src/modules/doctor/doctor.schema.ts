import { Schema } from '@nestjs/mongoose';

export type PatientDocument = Doctor & Document;

@Schema({
  timestamps: true,
})
export class Doctor {}
