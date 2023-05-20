import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config';
import { User } from './user/entities/user.entity';
import { Plant } from './plant/entities/plant.entity';
import { UserPlant } from './user-plant/entities/user-plant.entity';
import { DataSource } from 'typeorm';
import { UserService } from './user/user.service';
import { PlantService } from './plant/plant.service';
import { UserPlantService } from './user-plant/user-plant.service';
import { UserController } from './user/user.controller';
import { PlantController } from './plant/plant.controller';
import { UserPlantController } from './user-plant/user-plant.controller';
import { UserModule } from './user/user.module';
import { UserPlantModule } from './user-plant/user-plant.module';
import { PlantModule } from './plant/plant.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([User, UserPlant, Plant]),
    UserModule,
    PlantModule,
    UserPlantModule,
  ],
  controllers: [UserController, PlantController, UserPlantController],
  providers: [UserService, PlantService, UserPlantService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
