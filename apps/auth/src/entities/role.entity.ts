import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'bigint' })
  createdAt: number;

  @Column({ type: 'bigint', nullable: true })
  updatedAt: number;

  @BeforeInsert()
  setBeforeInsert() {
    this.createdAt = Date.now();
  }

  @BeforeUpdate()
  setBeforeUpdate() {
    this.updatedAt = Date.now();
  }
}
