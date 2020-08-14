import { Connection } from 'typeorm';
import { CreateTodoRequest, Todo, TodoStatus } from 'schema/types';
import { TodoEntity } from 'domain-model/src/todo/TodoEntity';

import { TodoRepository as TodoRepositoryIF } from '../../usecase/todo/repository.interface';
import { Todo as OrmTodo, OrmTodoFactory } from '../../infrastructure/typeorm/entity/Todo';

export class TodoRepository implements TodoRepositoryIF {
  private dbConnection: Connection;

  constructor(dbConnection: Connection) {
    this.dbConnection = dbConnection;
  }

  public async getById(id: string) {
    const repository = this.dbConnection.getRepository(OrmTodo);
    const result = await repository.findOne(id);
    if (!result) return null;

    return OrmTodoFactory.toEntity(result);
  }

  public async allByOwnerId(ownerId: string) {
    const repository = this.dbConnection.getRepository(OrmTodo);
    const result = await repository.find({ where: { ownerId } });
    if (!result.length) return null;

    const entities = result.map((todo) => OrmTodoFactory.toEntity(todo));
    return entities;
  }

  public async create(request: CreateTodoRequest) {
    const todo = new OrmTodo(+request.ownerId, request.title, TodoStatus.Undone);
    if (request.dueDate) todo.dueDate = request.dueDate;

    const repository = this.dbConnection.getRepository(OrmTodo);
    const created = await repository.save(todo);

    return OrmTodoFactory.toEntity(created);
  }

  public async update(todoEntity: TodoEntity) {
    const repository = this.dbConnection.getRepository(OrmTodo);
    const todo = OrmTodoFactory.fromEntity(todoEntity);
    const saved = await repository.save(todo);

    return OrmTodoFactory.toEntity(saved);
  }
}
