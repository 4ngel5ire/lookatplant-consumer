export class CreateUserPlantDto {
  userId: string;
  plantId: number;
  weight: number;
  imgUrl: string;

  constructor(params: typeof CreateUserPlantDto) {
    Object.assign(this, params);
  }
}
