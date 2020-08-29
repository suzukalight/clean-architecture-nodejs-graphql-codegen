import { CreateTodoResponse } from 'schema';
import { TodoEntity, CreateTodoPresenter as CreateTodoPresenterIF } from 'domain-model';

export class CreateTodoPresenter implements CreateTodoPresenterIF {
  private response: CreateTodoResponse;

  public getResponse(): CreateTodoResponse {
    return this.response;
  }

  public async output(todoEntity: TodoEntity) {
    this.response = { todo: todoEntity.toJSON() };
  }
}
