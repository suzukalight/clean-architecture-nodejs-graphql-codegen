import {
  GetTodoPresenter,
  GetTodoOutputData,
  CreateTodoPresenter,
  CreateTodoOutputData,
  DeleteTodoPresenter,
  DeleteTodoOutputData,
  DoneTodoPresenter,
  DoneTodoOutputData,
  UndoneTodoPresenter,
  UndoneTodoOutputData,
} from '../interface/presenter';
import { TodoEntity } from '../../../entity/todo/TodoEntity';

export class MockGetTodoPresenter implements GetTodoPresenter {
  private response: GetTodoOutputData | null = null;

  public getResponse() {
    return this.response;
  }

  public async output(todoEntity: TodoEntity | null) {
    this.response = todoEntity ? { todo: todoEntity.toDto() } : null;
  }
}

export class MockCreateTodoPresenter implements CreateTodoPresenter {
  private response: CreateTodoOutputData | null = null;

  public getResponse() {
    return this.response;
  }

  public async output(todoEntity: TodoEntity | null) {
    this.response = todoEntity ? { todo: todoEntity.toDto() } : null;
  }
}

export class MockDeleteTodoPresenter implements DeleteTodoPresenter {
  private response: DeleteTodoOutputData | null = null;

  public getResponse() {
    return this.response;
  }

  public async output(todoEntity: TodoEntity | null) {
    this.response = todoEntity ? { todo: todoEntity.toDto() } : null;
  }
}

export class MockDoneTodoPresenter implements DoneTodoPresenter {
  private response: DoneTodoOutputData | null = null;

  public getResponse() {
    return this.response;
  }

  public async output(todoEntity: TodoEntity | null) {
    this.response = todoEntity ? { todo: todoEntity.toDto() } : null;
  }
}

export class MockUndoneTodoPresenter implements UndoneTodoPresenter {
  private response: UndoneTodoOutputData | null = null;

  public getResponse() {
    return this.response;
  }

  public async output(todoEntity: TodoEntity | null) {
    this.response = todoEntity ? { todo: todoEntity.toDto() } : null;
  }
}
