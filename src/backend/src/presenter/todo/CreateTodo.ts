import {
  TodoEntity,
  CreateTodoPresenter as CreateTodoPresenterIF,
  CreateTodoOutputData,
} from 'domain-model';

export class CreateTodoPresenter implements CreateTodoPresenterIF {
  private response: CreateTodoOutputData | null;

  public getResponse() {
    return this.response;
  }

  public async output(todoEntity: TodoEntity | null) {
    this.response = todoEntity ? { todo: todoEntity.toDto() } : null;
  }
}
