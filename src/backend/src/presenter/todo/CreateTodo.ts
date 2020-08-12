import { CreateTodoResponse, Maybe } from 'schema/types';
import { TodoEntity } from 'domain-model/src/todo/TodoEntity';

import { CreateTodoPresenter as CreateTodoPresenterIF } from '../../usecase/todo/presenter.interface';

export class CreateTodoPresenter implements CreateTodoPresenterIF {
  private response: Maybe<CreateTodoResponse> = null;

  public getResponse(): Maybe<CreateTodoResponse> {
    return this.response;
  }

  public async output(todoEntity: Maybe<TodoEntity>) {
    this.response = { todo: todoEntity ? todoEntity.toJSON() : null };
  }
}
