import { Module } from '@nestjs/common';
import { UserPlantService } from './user-plant.service';
import { UserPlantController } from './user-plant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPlant } from './entities/user-plant-entity';
import { User } from 'src/user/entities/user-entity';
import { Plant } from 'src/plant/entities/plant-entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserPlant, User, Plant])],
  controllers: [UserPlantController],
  providers: [UserPlantService],
})
export class UserPlantModule {}
