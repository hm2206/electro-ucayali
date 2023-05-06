import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('items')
export class ItemOrm {
  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid')
  productoId: string;

  @Column('uuid')
  medidaId: string;

  @Column()
  amount: number;

  @Column()
  notaId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
