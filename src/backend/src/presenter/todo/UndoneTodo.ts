import { UndoneTodoResponse } from 'schema/types';
import { TodoEntity } from 'domain-model/src/todo/TodoEntity';

import { UndoneTodoPresenter as UndoneTodoPresenterIF } from '../../usecase/todo/presenter.interface';

export class UndoneTodoPresenter implements UndoneTodoPresenterIF {
  private response: UndoneTodoResponse;

  public getResponse(): UndoneTodoResponse {
    return this.response;
  }

  public async output(todoEntity: TodoEntity) {
    this.response = { todo: todoEntity.toJSON() };
  }
}
