import {
  TodoEntity,
  DeleteTodoPresenter as DeleteTodoPresenterIF,
  DeleteTodoOutputData,
} from 'domain-model';

export class DeleteTodoPresenter implements DeleteTodoPresenterIF {
  private response: DeleteTodoOutputData | null;

  public getResponse() {
    return this.response;
  }

  public async output(todoEntity: TodoEntity | null) {
    this.response = todoEntity ? { todo: todoEntity.toDto() } : null;
  }
}
