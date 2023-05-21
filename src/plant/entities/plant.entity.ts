import { Base } from 'src/base.entity';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { CreatePlantDto } from '../dto/create-plant.dto';

@Entity({ name: 'plant' })
export class Plant extends Base {
  @PrimaryColumn({
    name: 'plant_id',
    primaryKeyConstraintName: 'plantxpk',
  })
  plantId: number;

  @Column({ name: 'scientific_nm', nullable: false })
  scientificName: string;

  @Column({ name: 'common_nm' })
  commonName: string;

  @Column({ name: 'family' })
  family: string;

  @Column({ name: 'genus' })
  genus: string;

  @Column({ type: 'character varying', array: true, default: [] })
  tags: string[];

  constructor(plantDto?: CreatePlantDto) {
    super();
    if (plantDto === undefined) return;
    Object.assign(this, plantDto);
  }
}
