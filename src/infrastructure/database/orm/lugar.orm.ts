import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('lugares')
export class LugarOrm {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
