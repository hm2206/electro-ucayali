import { SerieTypeEnum } from 'src/domain/enums/serie.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('series')
export class SerieOrm {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: SerieTypeEnum })
  type: SerieTypeEnum;

  @Column()
  code: string;

  @Column('uuid')
  itemId: string;

  @Column({ default: true })
  state: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
