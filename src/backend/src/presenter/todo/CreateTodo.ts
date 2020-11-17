import { CreateTodoResponse } from 'schema/lib/app/types';
import { CreateTodoPresenter, CreateTodoOutputData } from 'domain-model';

import { toGqlTodo } from '../utils/converter/todo';

export class GqlCreateTodoPresenter implements CreateTodoPresenter {
  private response: CreateTodoResponse | null;

  public getResponse() {
    return this.response;
  }

  public async output(response: CreateTodoOutputData) {
    this.response = { todo: toGqlTodo(response.todo) };
  }
}
