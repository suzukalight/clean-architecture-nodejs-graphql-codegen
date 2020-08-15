import { CreateTodoResponse } from 'schema/types';
import { TodoEntity } from 'domain-model/src/entity/todo/TodoEntity';
import { CreateTodoPresenter as CreateTodoPresenterIF } from 'domain-model/src/usecase/todo/interface/presenter';

export class CreateTodoPresenter implements CreateTodoPresenterIF {
  private response: CreateTodoResponse;

  public getResponse(): CreateTodoResponse {
    return this.response;
  }

  public async output(todoEntity: TodoEntity) {
    this.response = { todo: todoEntity.toJSON() };
  }
}
