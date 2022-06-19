import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Post,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreatePatientDto } from './dto/create-patient.dto';
import { RolesGuard } from '../auth/guards/role-auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesEnum } from 'src/utils/enums/role.enum';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.create(createPatientDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.Doctor)
  @Get()
  findAll() {
    return this.patientService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Roles(RolesEnum.Doctor)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(RolesEnum.Doctor)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientService.update(id, updatePatientDto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(RolesEnum.Doctor)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientService.remove(id);
  }
}
