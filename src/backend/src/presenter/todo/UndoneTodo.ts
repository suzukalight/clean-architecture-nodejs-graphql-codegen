import { UndoneTodoResponse, Maybe } from 'schema/types';
import { TodoEntity } from 'domain-model/src/todo/TodoEntity';

import { UndoneTodoPresenter as UndoneTodoPresenterIF } from '../../usecase/todo/presenter.interface';

export class UndoneTodoPresenter implements UndoneTodoPresenterIF {
  private response: Maybe<UndoneTodoResponse> = null;

  public getResponse(): Maybe<UndoneTodoResponse> {
    return this.response;
  }

  public async output(todoEntity: TodoEntity) {
    this.response = { todo: todoEntity.toJSON() };
  }
}
