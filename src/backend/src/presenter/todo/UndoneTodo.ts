import { UndoneTodoResponse } from 'schema';
import { TodoEntity, UndoneTodoPresenter as UndoneTodoPresenterIF } from 'domain-model';

export class UndoneTodoPresenter implements UndoneTodoPresenterIF {
  private response: UndoneTodoResponse;

  public getResponse(): UndoneTodoResponse {
    return this.response;
  }

  public async output(todoEntity: TodoEntity) {
    this.response = { todo: todoEntity.toJSON() };
  }
}
