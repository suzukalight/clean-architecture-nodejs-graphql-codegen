import {
  TodoEntity,
  UndoneTodoOutputData,
  UndoneTodoPresenter as UndoneTodoPresenterIF,
} from 'domain-model';

export class UndoneTodoPresenter implements UndoneTodoPresenterIF {
  private response: UndoneTodoOutputData | null;

  public getResponse() {
    return this.response;
  }

  public async output(todoEntity: TodoEntity | null) {
    this.response = todoEntity ? { todo: todoEntity.toDto() } : null;
  }
}
