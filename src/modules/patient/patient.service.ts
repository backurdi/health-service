import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Doctor, DoctorDocument } from '../doctor/doctor.schema';
import { AddSuggestionDto } from '../doctor/dto/add-suggestion.dto';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient, PatientDocument } from './patient.schema';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient.name)
    private readonly patientModel: Model<PatientDocument>,
    @InjectModel(Doctor.name)
    private readonly docotorModel: Model<DoctorDocument>,
  ) {}
  async create(createPatientDto: CreatePatientDto) {
    const patient = await this.patientModel.create(createPatientDto);
    await this.docotorModel.findByIdAndUpdate(createPatientDto.doctor, {
      $push: { patients: patient._id },
    });
    return patient;
  }

  async findAll(): Promise<Patient[]> {
    return await this.patientModel.find().exec();
  }

  async findOne(id: string): Promise<Patient> {
    return await this.patientModel.findById(id).exec();
  }

  async update(
    id: string,
    updatePatientDto: UpdatePatientDto,
  ): Promise<Patient> {
    return await this.patientModel.findByIdAndUpdate(id, updatePatientDto, {
      new: true,
    });
  }

  async remove(id: string): Promise<Patient> {
    const deletedUser = await this.patientModel
      .findByIdAndRemove({
        _id: id,
      })
      .exec();
    return deletedUser;
  }

  async addSuggestion(
    id: string,
    suggestion: AddSuggestionDto,
  ): Promise<Patient> {
    const patient = await this.patientModel.findByIdAndUpdate(
      id,
      {
        $push: { suggestions: suggestion },
      },
      { new: true },
    );
    if (!patient) {
      throw new HttpException('User was not found', HttpStatus.NOT_FOUND);
    }

    return patient;
  }
}
