import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CheckInService } from './check-in.service';
import { CheckIn } from './check-in.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('check-in')
export class CheckInController {
  constructor(private readonly checkInService: CheckInService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() createCheckInDto) {
    return await this.checkInService.create(createCheckInDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllForUser(@Request() req): Promise<CheckIn[]> {
    return this.checkInService.findAll(req.user.userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CheckIn> {
    return this.checkInService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCheckIn) {
    return this.checkInService.update(id, updateCheckIn);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.checkInService.delete(id);
  }
}
