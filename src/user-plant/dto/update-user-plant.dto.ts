import { PartialType } from '@nestjs/mapped-types';
import { CreateUserPlantDto } from './create-user-plant.dto';

export class UpdateUserPlantDto extends PartialType(CreateUserPlantDto) {}
