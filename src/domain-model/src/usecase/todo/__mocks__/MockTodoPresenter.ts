import {
  Maybe,
  Todo,
  CreateTodoResponse,
  DeleteTodoResponse,
  DoneTodoResponse,
  UndoneTodoResponse,
} from 'schema';

import {
  GetTodoPresenter,
  CreateTodoPresenter,
  DeleteTodoPresenter,
  DoneTodoPresenter,
  UndoneTodoPresenter,
} from '../interface/presenter';
import { TodoEntity } from '../../../entity/todo/TodoEntity';

export class MockGetTodoPresenter implements GetTodoPresenter {
  private response: Maybe<Todo> = null;

  public getResponse(): Maybe<Todo> {
    return this.response;
  }

  public async output(todoEntity: Maybe<TodoEntity>) {
    this.response = todoEntity ? todoEntity.toJSON() : null;
  }
}

export class MockCreateTodoPresenter implements CreateTodoPresenter {
  private response: Maybe<CreateTodoResponse> = null;

  public getResponse(): Maybe<CreateTodoResponse> {
    return this.response;
  }

  public async output(todoEntity: Maybe<TodoEntity>) {
    this.response = todoEntity ? { todo: todoEntity.toJSON() } : null;
  }
}

export class MockDeleteTodoPresenter implements DeleteTodoPresenter {
  private response: Maybe<DeleteTodoResponse> = null;

  public getResponse(): Maybe<DeleteTodoResponse> {
    return this.response;
  }

  public async output(todoEntity: Maybe<TodoEntity>) {
    this.response = todoEntity ? { todo: todoEntity.toJSON() } : null;
  }
}

export class MockDoneTodoPresenter implements DoneTodoPresenter {
  private response: Maybe<DoneTodoResponse> = null;

  public getResponse(): Maybe<DoneTodoResponse> {
    return this.response;
  }

  public async output(todoEntity: Maybe<TodoEntity>) {
    this.response = todoEntity ? { todo: todoEntity.toJSON() } : null;
  }
}

export class MockUndoneTodoPresenter implements UndoneTodoPresenter {
  private response: Maybe<UndoneTodoResponse> = null;

  public getResponse(): Maybe<UndoneTodoResponse> {
    return this.response;
  }

  public async output(todoEntity: Maybe<TodoEntity>) {
    this.response = todoEntity ? { todo: todoEntity.toJSON() } : null;
  }
}
