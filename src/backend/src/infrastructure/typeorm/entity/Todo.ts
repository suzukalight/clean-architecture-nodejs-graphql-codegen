import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { User } from './User';

@Entity('todos')
export class Todo {
  @PrimaryGeneratedColumn()
  readonly id?: number;

  @Column()
  ownerId: number;

  @ManyToOne(() => User, (user) => user.todos)
  @JoinColumn({ name: 'ownerId' })
  owner?: User;

  @Column()
  title: string;

  @Column()
  status: string;

  @Column('datetime', { default: null })
  dueDate?: Date | null = null;

  @CreateDateColumn()
  readonly createdAt?: Date;

  @UpdateDateColumn()
  readonly updatedAt?: Date;

  constructor(ownerId: number, title: string, status: string) {
    this.ownerId = ownerId;
    this.title = title;
    this.status = status;
  }
}
