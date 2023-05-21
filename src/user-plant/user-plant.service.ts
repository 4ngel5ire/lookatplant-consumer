import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserPlantDto } from './dto/create-user-plant.dto';
import { UpdateUserPlantDto } from './dto/update-user-plant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPlant } from './entities/user-plant.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Plant } from 'src/plant/entities/plant.entity';

@Injectable()
export class UserPlantService {
  constructor(
    @InjectRepository(UserPlant)
    private userPlantRepo: Repository<UserPlant>,
  ) {}

  async create(createUserPlantDto: CreateUserPlantDto) {
    const userPromise = User.findOne({
      where: { userId: createUserPlantDto.userId },
    });
    const plantPromise = Plant.findOne({
      where: { plantId: createUserPlantDto.plantId },
    });
    const [user, plant] = await Promise.allSettled([userPromise, plantPromise]);
    if (user.status === 'rejected' || !user.value)
      throw new NotFoundException('User not found');
    if (plant.status === 'rejected' || !plant.value)
      throw new NotFoundException('Plant not found');
    return await new UserPlant(
      user.value,
      plant.value,
      createUserPlantDto,
    ).save();
  }

  async findAll() {
    return await this.userPlantRepo.find({
      relations: { user: true, plant: true },
    });
  }
}
