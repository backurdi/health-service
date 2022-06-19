import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Doctor, DoctorDocument } from './doctor.schema';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Injectable()
export class DoctorService {
  constructor(
    @InjectModel(Doctor.name)
    private readonly doctorModel: Model<DoctorDocument>,
  ) {}

  async create(createDoctorDto: CreateDoctorDto) {
    return await this.doctorModel.create(createDoctorDto);
  }

  async findAll() {
    return await this.doctorModel.find().exec();
  }

  async findOne(id: string) {
    return await this.doctorModel.findById(id).exec();
  }

  async update(id: string, updateDoctorDto: UpdateDoctorDto) {
    return await this.doctorModel.findByIdAndUpdate(id, updateDoctorDto, {
      new: true,
    });
  }

  async remove(id: string) {
    const deletedUser = await this.doctorModel
      .findByIdAndRemove({
        _id: id,
      })
      .exec();
    return deletedUser;
  }
}
