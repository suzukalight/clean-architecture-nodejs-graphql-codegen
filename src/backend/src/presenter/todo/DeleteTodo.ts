import { DeleteTodoResponse } from 'schema';
import { TodoEntity, DeleteTodoPresenter as DeleteTodoPresenterIF } from 'domain-model';

export class DeleteTodoPresenter implements DeleteTodoPresenterIF {
  private response: DeleteTodoResponse;

  public getResponse(): DeleteTodoResponse {
    return this.response;
  }

  public async output(todoEntity: TodoEntity) {
    this.response = { todo: todoEntity.toJSON() };
  }
}
