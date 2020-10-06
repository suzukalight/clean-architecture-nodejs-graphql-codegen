import { UndoneTodoResponse } from 'schema';
import { UndoneTodoOutputData, UndoneTodoPresenter } from 'domain-model';

import { toGqlTodo } from '../utils/converter/todo';

export class GqlUndoneTodoPresenter implements UndoneTodoPresenter {
  private response: UndoneTodoResponse | null;

  public getResponse() {
    return this.response;
  }

  public async output(response: UndoneTodoOutputData) {
    this.response = { todo: toGqlTodo(response.todo)! };
  }
}
