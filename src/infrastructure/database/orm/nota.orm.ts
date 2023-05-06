import { NotaTypeEnum } from 'src/domain/enums/nota.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('notas')
export class NotaOrm {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column('date')
  date: Date;

  @Column({ nullable: true })
  documentCrp?: string;

  @Column({ type: 'enum', enum: NotaTypeEnum })
  type: NotaTypeEnum;

  @Column('uuid')
  areaId: string;

  @Column('uuid')
  lugarId: string;

  @Column('text', { nullable: true })
  observation?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
