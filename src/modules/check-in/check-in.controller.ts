import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CheckInService } from './check-in.service';
import { CreateCheckInDto } from './dto/create-Check-in.dto';
import { CheckIn } from './check-in.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('check-in')
export class CheckInController {
  constructor(private readonly checkInService: CheckInService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createCheckInDto: CreateCheckInDto) {
    await this.checkInService.create(createCheckInDto);
    return 'success';
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<CheckIn[]> {
    return this.checkInService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CheckIn> {
    return this.checkInService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.checkInService.delete(id);
  }
}
