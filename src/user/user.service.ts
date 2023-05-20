import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto) {
    return await new User(createUserDto).save();
  }

  async findAll() {
    return await User.find({ relations: { userPlants: true } });
  }

  async findOne(id: string) {
    return await User.find({
      where: { userId: id },
      relations: { userPlants: true },
    });
  }
}
