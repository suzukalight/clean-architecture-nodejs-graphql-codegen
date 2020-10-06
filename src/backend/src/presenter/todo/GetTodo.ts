import {
  TodoEntity,
  GetTodoPresenter as GetTodoPresenterIF,
  GetTodoOutputData,
} from 'domain-model';

export class GetTodoPresenter implements GetTodoPresenterIF {
  private response: GetTodoOutputData | null = null;

  public getResponse() {
    return this.response;
  }

  public async output(todoEntity: TodoEntity | null) {
    this.response = todoEntity ? { todo: todoEntity.toDto() } : null;
  }
}
