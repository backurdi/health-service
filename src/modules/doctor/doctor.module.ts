import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { Doctor, DoctorSchema } from './doctor.schema';
import * as bcrypt from 'bcrypt';
import crypto from 'crypto';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/config/configuration';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    MongooseModule.forFeatureAsync([
      {
        name: Doctor.name,
        useFactory: () => {
          const schema = DoctorSchema;
          schema.pre('save', async function (next) {
            // Only run this function if password was actually modified
            if (!this.isModified('password')) return next();

            // Hash the password with cost of 12
            // this.password = this.password;
            this.password = await bcrypt.hash(this.password, 12);

            // Delete passwordConfirm field
            this.passwordConfirm = undefined;
            next();
          });
          schema.pre('save', function (next) {
            if (!this.isModified('password') || this.isNew) return next();

            this.passwordChangedAt = Date.now() - 1000;
            next();
          });

          schema.pre(/^find/, function (next) {
            // this points to the current query
            // this.find({ active: { $ne: false } });
            next();
          });

          schema.methods.correctPassword = async function (
            candidatePassword,
            userPassword,
          ) {
            return await bcrypt.compare(candidatePassword, userPassword);
          };

          schema.methods.changedPasswordAfter = function (JWTTimestamp) {
            if (this.passwordChangedAt) {
              const changedTimestamp = this.passwordChangedAt.getTime() / 1000;

              return JWTTimestamp < changedTimestamp;
            }

            // False means NOT changed
            return false;
          };

          schema.methods.createPasswordResetToken = function () {
            const resetToken = crypto.randomBytes(32).toString('hex');

            this.passwordResetToken = crypto
              .createHash('sha256')
              .update(resetToken)
              .digest('hex');

            this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

            return resetToken;
          };
          return schema;
        },
      },
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
  ],
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class DoctorModule {}
