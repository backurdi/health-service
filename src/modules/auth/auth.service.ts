import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { Doctor, DoctorDocument } from '../doctor/doctor.schema';
import { Patient, PatientDocument } from '../patient/patient.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Patient.name)
    private readonly patientModel: Model<PatientDocument>,
    @InjectModel(Doctor.name)
    private readonly doctorModel: Model<DoctorDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    let user: any;
    user = await this.patientModel.findOne({ email }).select('+password');
    if (!user) {
      user = await this.doctorModel.findOne({ email }).select('+password');
    }

    if (user && (await bcrypt.compare(pass, user.password))) {
      const { name, _id } = user;
      return { username: name, userId: _id };
    }
    return null;
  }

  async login(user, type) {
    const payload = { username: user.username, sub: user.userId, type };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async findMe(req, token) {
    const tokenData = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
    console.log(tokenData.type);
    let user;
    if (tokenData.type === 'Patient') {
      user = await this.patientModel.findById(req.user.userId);
    } else {
      user = await this.doctorModel.findById(req.user.userId);
    }
    return user;
  }
}
