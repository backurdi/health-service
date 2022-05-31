import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CheckInService } from './check-in.service';
import { CheckInSchema, CheckIn } from './check-in.schema';
import { CheckInController } from './check-in.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CheckIn.name, schema: CheckInSchema }]),
  ],
  controllers: [CheckInController],
  providers: [CheckInService],
})
export class CheckInModule {}
