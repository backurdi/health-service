import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesEnum } from 'src/utils/enums/role.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role-auth.guard';
import { PatientService } from '../patient/patient.service';
import { DoctorService } from './doctor.service';
import { AddSuggestionDto } from './dto/add-suggestion.dto';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Controller('doctor')
export class DoctorController {
  constructor(
    private readonly doctorService: DoctorService,
    private readonly patientService: PatientService,
  ) {}

  @Post()
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorService.create(createDoctorDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.Doctor)
  @Get()
  findAll() {
    return this.doctorService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.Doctor)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.Doctor)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorService.update(id, updateDoctorDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.Doctor)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorService.remove(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.Doctor)
  @Post(':patientId/addSuggestion')
  addSuggestionToPatient(
    @Param('patientId') patientId: string,
    @Body() addSuggestionDto: AddSuggestionDto,
  ) {
    return this.patientService.addSuggestion(patientId, addSuggestionDto);
  }
}
