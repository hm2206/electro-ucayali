import { SituacionEntity } from 'src/domain/entities/situacion';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { NotaOrm } from './nota.orm';

@Entity('situaciones')
export class SituacionOrm implements SituacionEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => NotaOrm, (nota) => nota.situacion)
  notas: NotaOrm[];
}
