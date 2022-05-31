import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CheckIn, CheckInDocument } from './check-in.schema';
import { CreateCheckInDto } from './dto/create-check-in.dto';

@Injectable()
export class CheckInService {
  constructor(
    @InjectModel(CheckIn.name)
    private readonly checkInModel: Model<CheckInDocument>,
  ) {}

  async create(createCheckInDto: CreateCheckInDto): Promise<CheckIn> {
    const createdCheckIn = await this.checkInModel.create(createCheckInDto);
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
