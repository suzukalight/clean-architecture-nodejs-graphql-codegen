import { Connection, Repository } from 'typeorm';
import {
  TodoQueryService,
  DeadlineNearingTodosQuery,
  DeadlineNearingTodosQueryResult,
  AllTodosQuery,
} from 'domain-model';

import { Todo as OrmTodo, OrmTodoFactory } from '../entity/Todo';

export class GqlTodoQueryService implements TodoQueryService {
  private dbConnection: Connection;
  private repository: Repository<OrmTodo>;

  constructor(dbConnection: Connection) {
    this.dbConnection = dbConnection;
    this.repository = this.dbConnection.getRepository(OrmTodo);
  }

  public async all(_query: AllTodosQuery) {
    // FIXME
    return { todos: null };
  }

  public async allDeadlineNearingTodos(_query: DeadlineNearingTodosQuery) {
    // TODO: queryを検査

    // FIXME: conditionを正しく設定
    const result = await this.repository.find({});
    if (!result) return { todos: null };

    const res: DeadlineNearingTodosQueryResult = {
      todos: result.map((todo) => OrmTodoFactory.toDto(todo)),
    };
    return res;
  }
}
