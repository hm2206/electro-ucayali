import { NotaTypeEnum } from 'src/domain/enums/nota.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AreaOrm } from './area.orm';
import { LugarOrm } from './lugar.orm';
import { MotivoOrm } from './motivo.orm';
import { SituacionOrm } from './situacion.orm';
import { ItemOrm } from './item.orm';

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

  @Column('uuid', { nullable: true })
  motivoId?: string;

  @Column('uuid', { nullable: true })
  situacionId?: string;

  @Column('text', { nullable: true })
  observation?: string;

  @Column({ default: true })
  state: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => AreaOrm, (area) => area.notas)
  area: AreaOrm;

  @ManyToOne(() => LugarOrm, (lugar) => lugar.notas)
  lugar: LugarOrm;

  @ManyToOne(() => MotivoOrm, (motivo) => motivo.notas)
  motivo: MotivoOrm;

  @ManyToOne(() => SituacionOrm, (situacion) => situacion.notas)
  situacion: SituacionOrm;

  @OneToMany(() => ItemOrm, (item) => item.nota)
  items: ItemOrm[];
}
