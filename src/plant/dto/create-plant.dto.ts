export class CreatePlantDto {
  plantId: number;
  scientificName: string;
  commonName: string;
  family: string;
  genus: string;
  tags: string[];

  constructor(params: typeof CreatePlantDto) {
    Object.assign(this, params);
  }
}
