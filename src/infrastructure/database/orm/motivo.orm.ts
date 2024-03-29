import { MotivoEntity } from 'src/domain/entities/motivo';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { NotaOrm } from './nota.orm';

@Entity('motivos')
export class MotivoOrm implements MotivoEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: true })
  state: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => NotaOrm, (nota) => nota.motivo)
  notas: NotaOrm[];
}
