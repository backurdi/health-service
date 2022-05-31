import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient, PatientDocument } from './patient.schema';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient.name)
    private readonly patientModel: Model<PatientDocument>,
  ) {}
  async create(createPatientDto: CreatePatientDto) {
    const createPatient = await this.patientModel.create(createPatientDto);
    return createPatient;
  }

  async findAll(): Promise<Patient[]> {
    return await this.patientModel.find().exec();
  }

  async findOne(id: string): Promise<Patient> {
    return await this.patientModel.findOne({ _id: id }).exec();
  }

  async update(
    id: number,
    updatePatientDto: UpdatePatientDto,
  ): Promise<Patient> {
    return await this.patientModel.findByIdAndUpdate(id, updatePatientDto);
  }

  async remove(id: number): Promise<Patient> {
    const deletedCheckIn = await this.patientModel
      .findByIdAndRemove({
        _id: id,
      })
      .exec();
    return deletedCheckIn;
  }
}
