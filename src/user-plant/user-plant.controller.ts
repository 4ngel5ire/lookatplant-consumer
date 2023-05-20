import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserPlantService } from './user-plant.service';
import { CreateUserPlantDto } from './dto/create-user-plant.dto';
import { UpdateUserPlantDto } from './dto/update-user-plant.dto';

@Controller('user-plant')
export class UserPlantController {
  constructor(private readonly userPlantService: UserPlantService) {}

  @Post()
  async create(@Body() createUserPlantDto: CreateUserPlantDto) {
    return await this.userPlantService.create(createUserPlantDto);
  }

  @Get()
  async findAll() {
    return await this.userPlantService.findAll();
  }
}
