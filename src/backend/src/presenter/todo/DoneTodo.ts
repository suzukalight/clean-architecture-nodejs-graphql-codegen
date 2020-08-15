import { DoneTodoResponse } from 'schema/types';
import { TodoEntity } from 'domain-model/src/entity/todo/TodoEntity';
import { DoneTodoPresenter as DoneTodoPresenterIF } from 'domain-model/src/usecase/todo/interface/presenter';

export class DoneTodoPresenter implements DoneTodoPresenterIF {
  private response: DoneTodoResponse;

  public getResponse(): DoneTodoResponse {
    return this.response;
  }

  public async output(todoEntity: TodoEntity) {
    this.response = { todo: todoEntity.toJSON() };
  }
}
