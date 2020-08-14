import { DoneTodoResponse, Maybe } from 'schema/types';
import { TodoEntity } from 'domain-model/src/todo/TodoEntity';

import { DoneTodoPresenter as DoneTodoPresenterIF } from '../../usecase/todo/presenter.interface';

export class DoneTodoPresenter implements DoneTodoPresenterIF {
  private response: Maybe<DoneTodoResponse> = null;

  public getResponse(): Maybe<DoneTodoResponse> {
    return this.response;
  }

  public async output(todoEntity: TodoEntity) {
    this.response = { todo: todoEntity.toJSON() };
  }
}
