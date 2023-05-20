import { Injectable } from '@nestjs/common';
import { CreatePlantDto } from './dto/create-plant.dto';
import { UpdatePlantDto } from './dto/update-plant.dto';
import { Plant } from './entities/plant.entity';

@Injectable()
export class PlantService {
  async create(createPlantDto: CreatePlantDto) {
    return await new Plant(createPlantDto).save();
  }
}
