import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CheckInModule } from './modules/check-in/check-in.module';
import { ConfigModule } from '@nestjs/config';
import { PatientModule } from './modules/patient/patient.module';
import configuration from './config/configuration';
import { DoctorModule } from './modules/doctor/doctor.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { Doctor, DoctorSchema } from './modules/doctor/doctor.schema';

@Module({
  imports: [
    PatientModule,
    CheckInModule,
    DoctorModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@health.eep9xg5.mongodb.net/health?retryWrites=true&w=majority`,
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
