import { UUID, randomUUID } from 'crypto';
import { Base } from 'src/base.entity';
import { Plant } from 'src/plant/entities/plant.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CreateUserPlantDto } from '../dto/create-user-plant.dto';

@Entity({ name: 'user_plant' })
export class UserPlant extends Base {
  @PrimaryColumn({
    name: 'user_plant_id',
    primaryKeyConstraintName: 'user_plant_xpk',
    default: randomUUID(),
  })
  userPlantId: string;

  @ManyToOne(() => User, (user) => user.userPlants)
  @JoinColumn({ name: 'user_id', foreignKeyConstraintName: 'user_fk' })
  user: User;

  @ManyToOne(() => Plant, (plant) => plant.plantId)
  @JoinColumn({ name: 'plant_id', foreignKeyConstraintName: 'plant_fk' })
  plant: Plant;

  @Column({ name: 'weight', nullable: false })
  weight: number;

  @Column({ name: 'img_url', nullable: false })
  imgUrl: string;

  constructor(user: User, plant: Plant, userPlantDto?: CreateUserPlantDto) {
    super();
    if (userPlantDto === undefined) return;
    Object.assign(this, userPlantDto);
    this.plant = plant;
    this.user = user;
  }
}
