import { Maybe, Todo } from 'schema/types';
import { TodoEntity } from 'domain-model/src/entity/todo/TodoEntity';

import { GetTodoPresenter as GetTodoPresenterIF } from 'domain-model/src/usecase/todo/interface/presenter';

export class GetTodoPresenter implements GetTodoPresenterIF {
  private response: Maybe<Todo> = null;

  public getResponse(): Maybe<Todo> {
    return this.response;
  }

  public async output(todoEntity: Maybe<TodoEntity>) {
    this.response = todoEntity ? todoEntity.toJSON() : null;
  }
}
