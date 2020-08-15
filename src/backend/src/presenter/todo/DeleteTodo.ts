import { DeleteTodoResponse } from 'schema/types';
import { TodoEntity } from 'domain-model/src/entity/todo/TodoEntity';
import { DeleteTodoPresenter as DeleteTodoPresenterIF } from 'domain-model/src/usecase/todo/interface/presenter';

export class DeleteTodoPresenter implements DeleteTodoPresenterIF {
  private response: DeleteTodoResponse;

  public getResponse(): DeleteTodoResponse {
    return this.response;
  }

  public async output(todoEntity: TodoEntity) {
    this.response = { todo: todoEntity.toJSON() };
  }
}
