import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlantService } from './plant.service';
import { CreatePlantDto } from './dto/create-plant.dto';
import { UpdatePlantDto } from './dto/update-plant.dto';

@Controller('plant')
export class PlantController {
  constructor(private readonly plantService: PlantService) {}

  @Post()
  async create(@Body() createPlantDto: CreatePlantDto) {
    return await this.plantService.create(createPlantDto);
  }
}
