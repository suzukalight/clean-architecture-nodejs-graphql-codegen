import { Connection, LessThanOrEqual, Repository } from 'typeorm';
import {
  TodoQueryService,
  AllTodosWithDeadlineApproachingQuery,
  AllTodosWithDeadlineApproachingQueryResult,
  AllTodosQuery,
  denyIfNotSet,
} from 'domain-model';
import addDays from 'date-fns/addDays';

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

  public async allTodosWithDeadlineApproaching(query: AllTodosWithDeadlineApproachingQuery) {
    // how:
    // 1. deadlineを決める。dueDateのdaysBeforeWarning日後を警告日とする。これより古いTODOを探す
    // 2. findする。deadlineより前のdueDateになっているTODOを探す。dueDateを過ぎたものも含む
    // note:
    // dueDateは0:00:00で格納されているものとし、<=演算子でdBWを含める

    denyIfNotSet(query, ['dueDate', 'daysBeforeWarning']);

    // FIXME: actorによるownerIdの制限
    const deadlineDate = addDays(query.dueDate, query.daysBeforeWarning);
    const result = await this.repository.find({
      relations: ['owner'], // eager loading で resolver の負荷を下げる
      where: {
        dueDate: LessThanOrEqual(deadlineDate),
      },
    });
    if (!result) return { todos: null };

    const res: AllTodosWithDeadlineApproachingQueryResult = {
      todos: result.map((todo) => OrmTodoFactory.toDto(todo)),
    };
    return res;
  }
}
