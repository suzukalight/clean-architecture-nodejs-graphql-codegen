import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('todos')
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ownerId: number;

  @Column()
  title: string;

  @Column()
  status: string;

  @Column()
  dueDate: Date;
}
