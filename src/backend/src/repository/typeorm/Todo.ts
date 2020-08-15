import { Connection, Repository } from 'typeorm';
import { NotFoundError } from 'common/error/NotFound';
import { CreateTodoRequest, TodoStatus, DeleteTodoRequest } from 'schema/types';
import { TodoEntity } from 'domain-model/src/todo/TodoEntity';

import { TodoRepository as TodoRepositoryIF } from '../../usecase/todo/interface/repository';
import { Todo as OrmTodo, OrmTodoFactory } from '../../infrastructure/typeorm/entity/Todo';

export class TodoRepository implements TodoRepositoryIF {
  private dbConnection: Connection;
  private repository: Repository<OrmTodo>;

  constructor(dbConnection: Connection) {
    this.dbConnection = dbConnection;
    this.repository = this.dbConnection.getRepository(OrmTodo);
  }

  public async getById(id: string) {
    const result = await this.repository.findOne(id);
    if (!result) return null;

    return OrmTodoFactory.toEntity(result);
  }

  public async allByOwnerId(ownerId: string) {
    const result = await this.repository.find({ where: { ownerId } });
    if (!result.length) return null;

    const entities = result.map((todo) => OrmTodoFactory.toEntity(todo));
    return entities;
  }

  public async create(request: CreateTodoRequest) {
    const todo = new OrmTodo(+request.ownerId, request.title, TodoStatus.Undone);
    if (request.dueDate) todo.dueDate = request.dueDate;

    const created = await this.repository.save(todo);

    return OrmTodoFactory.toEntity(created);
  }

  public async update(todoEntity: TodoEntity) {
    const todo = OrmTodoFactory.fromEntity(todoEntity);
    const saved = await this.repository.save(todo);

    return OrmTodoFactory.toEntity(saved);
  }

  public async delete(request: DeleteTodoRequest) {
    const todo = await this.repository.findOne(request.id);
    if (!todo) throw new NotFoundError();

    await this.repository.delete(request.id);

    return OrmTodoFactory.toEntity(todo);
  }
}
