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
import { TodoEntity } from 'domain-model/src/todo/TodoEntity';
import { Todo as TodoSchema, TodoStatus } from 'schema/types';

@Entity('todos')
export class Todo {
  @PrimaryGeneratedColumn()
  id?: number;

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

export class OrmTodoFactory {
  public static fromSchema(todoSchema: TodoSchema) {
    const ormTodo = new Todo(+todoSchema.ownerId, todoSchema.title, todoSchema.status);
    Object.assign(ormTodo, todoSchema);
    return ormTodo;
  }

  public static fromEntity(todoEntity: TodoEntity) {
    const todoSchema = todoEntity.toJSON();
    return OrmTodoFactory.fromSchema(todoSchema);
  }

  public static toSchema(todo: Todo): TodoSchema {
    return {
      id: `${todo.id}`,
      ownerId: `${todo.ownerId}`,
      title: todo.title,
      status: todo.status as TodoStatus,
      dueDate: todo.dueDate,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
    };
  }
}
