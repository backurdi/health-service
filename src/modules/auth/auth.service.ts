import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { RolesEnum } from 'src/utils/enums/role.enum';
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

  async validateUser(email: string, pass: string, role: any): Promise<any> {
    let user: any;
    if (role === RolesEnum.Patient) {
      user = await this.patientModel.findOne({ email }).select('+password');
    } else {
      user = await this.doctorModel.findOne({ email }).select('+password');
    }
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { name, _id } = user;
      return { username: name, userId: _id, role: role };
    }
    return null;
  }

  async login(user, body) {
    if (this.validateUser(body.email, body.password, body.role)) {
      const payload = {
        username: user.username,
        sub: user.userId,
        role: body.role,
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    return null;
  }

  async findMe(req, token) {
    const tokenData = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
    let user;
    if (tokenData.role === 'Patient') {
      user = await this.patientModel.findById(req.user.userId);
    } else {
      user = await this.doctorModel.findById(req.user.userId);
    }
    return user;
  }
}
