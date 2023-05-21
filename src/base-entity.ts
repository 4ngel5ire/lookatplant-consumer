import { UpdateDateColumn, CreateDateColumn, BaseEntity } from 'typeorm';

export abstract class Base extends BaseEntity {
  @CreateDateColumn({
    name: 'insert_ts',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  insertTs: Date;

  @UpdateDateColumn({
    name: 'modification_ts',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  modificationTs: Date;
}
