import {
  TodoEntity,
  DoneTodoPresenter as DoneTodoPresenterIF,
  DoneTodoOutputData,
} from 'domain-model';

export class DoneTodoPresenter implements DoneTodoPresenterIF {
  private response: DoneTodoOutputData | null;

  public getResponse() {
    return this.response;
  }

  public async output(todoEntity: TodoEntity | null) {
    this.response = todoEntity ? { todo: todoEntity.toDto() } : null;
  }
}
