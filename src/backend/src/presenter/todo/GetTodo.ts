import { Maybe, Todo } from 'schema';
import { TodoEntity, GetTodoPresenter as GetTodoPresenterIF } from 'domain-model';

export class GetTodoPresenter implements GetTodoPresenterIF {
  private response: Maybe<Todo> = null;

  public getResponse(): Maybe<Todo> {
    return this.response;
  }

  public async output(todoEntity: Maybe<TodoEntity>) {
    this.response = todoEntity ? todoEntity.toJSON() : null;
  }
}
