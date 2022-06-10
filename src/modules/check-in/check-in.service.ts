import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CheckIn, CheckInDocument } from './check-in.schema';
import { CreateCheckInDto } from './dto/create-check-in.dto';
import { Patient, PatientDocument } from '../patient/patient.schema';

@Injectable()
export class CheckInService {
  constructor(
    @InjectModel(CheckIn.name)
    private readonly checkInModel: Model<CheckInDocument>,
    @InjectModel(Patient.name)
    private readonly patientModel: Model<PatientDocument>,
  ) {}

  async create(createCheckInDto): Promise<CheckIn> {
    const createdCheckIn = await this.checkInModel.create(
      createCheckInDto.body,
    );
    console.log(createCheckInDto.body);
    await this.patientModel.findByIdAndUpdate(createCheckInDto.user.userId, {
      $push: { checkIns: createdCheckIn._id },
    });
    return createdCheckIn;
  }

  async findAll(): Promise<CheckIn[]> {
    return this.checkInModel.find().exec();
  }

  async findOne(id: string): Promise<CheckIn> {
    return this.checkInModel.findOne({ _id: id }).exec();
  }

  async delete(id: string) {
    const deletedCheckIn = await this.checkInModel
      .findByIdAndRemove({
        _id: id,
      })
      .exec();
    return deletedCheckIn;
  }
}
