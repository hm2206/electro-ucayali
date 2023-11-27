import { NotaTypeEnum } from 'src/domain/enums/nota.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('secuencias')
export class SecuenciaOrm {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: NotaTypeEnum })
  type: NotaTypeEnum;

  @Column()
  year: number;

  @Column()
  current: number;

  @Column()
  formato: string;

  @Column({ default: true })
  state: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
