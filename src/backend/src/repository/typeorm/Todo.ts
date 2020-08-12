import { Connection } from 'typeorm';
import { CreateTodoRequest, Todo, TodoStatus } from 'schema/types';
import { TodoEntity } from 'domain-model/src/todo/TodoEntity';

import { TodoRepository as TodoRepositoryIF } from '../../usecase/todo/repository.interface';
import { Todo as OrmTodo } from '../../infrastructure/typeorm/entity/Todo';

export class TodoRepository implements TodoRepositoryIF {
  private dbConnection: Connection;

  constructor(dbConnection: Connection) {
    this.dbConnection = dbConnection;
  }

  public async getById(id: string) {
    const repository = this.dbConnection.getRepository(OrmTodo);
    const result = await repository.findOne(id);
    if (!result) return null;

    const entity = new TodoEntity((result as unknown) as Todo);
    return entity;
  }

  public async allByOwnerId(ownerId: string) {
    const repository = this.dbConnection.getRepository(OrmTodo);
    const result = await repository.find({ where: { ownerId } });
    if (!result.length) return null;

    const entities = result.map((todo) => new TodoEntity((todo as unknown) as Todo));
    return entities;
  }

  public async create(request: CreateTodoRequest) {
    const todo = new OrmTodo(+request.ownerId, request.title, TodoStatus.Undone);
    if (request.dueDate) todo.dueDate = request.dueDate;

    const repository = this.dbConnection.getRepository(OrmTodo);
    const result = await repository.save(todo);

    const entity = new TodoEntity((result as unknown) as Todo);
    return entity;
  }
}
