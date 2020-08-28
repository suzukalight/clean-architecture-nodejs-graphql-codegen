import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Todo as TodoSchema, TodoStatus } from 'schema/types';
import { TodoEntity } from 'domain-model/src/entity/todo/TodoEntity';

import { User } from '../../user/entity/User';

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
  public static fromSchema(todo: TodoSchema): Todo {
    return {
      id: +todo.id,
      ownerId: +todo.ownerId,
      title: todo.title,
      status: todo.status,
      dueDate: todo.dueDate,
      createdAt: todo.createdAt ?? undefined,
      updatedAt: todo.updatedAt ?? undefined,
    };
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

  public static toEntity(todo: Todo): TodoEntity {
    const schema = OrmTodoFactory.toSchema(todo);
    return new TodoEntity(schema);
  }
}
