import { UserPlant } from 'src/user-plant/entities/user-plant-entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { Base } from 'src/base-entity';

@Entity({ name: 'user' })
export class User extends Base {
  @PrimaryColumn({ name: 'user_id', primaryKeyConstraintName: 'userxpk' })
  userId: string;

  @Column({ name: 'email' })
  email: string;

  @OneToMany(() => UserPlant, (userPlant) => userPlant.user)
  userPlants: UserPlant[];

  constructor(user?: CreateUserDto) {
    super();
    if (user === undefined) return;
    this.userId = user.userId;
    this.email = user.email;
  }
}
