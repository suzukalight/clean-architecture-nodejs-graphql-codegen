import { DoneTodoResponse } from 'schema';
import { TodoEntity, DoneTodoPresenter as DoneTodoPresenterIF } from 'domain-model';

export class DoneTodoPresenter implements DoneTodoPresenterIF {
  private response: DoneTodoResponse;

  public getResponse(): DoneTodoResponse {
    return this.response;
  }

  public async output(todoEntity: TodoEntity) {
    this.response = { todo: todoEntity.toJSON() };
  }
}
