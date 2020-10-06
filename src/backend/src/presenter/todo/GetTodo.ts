import { Todo } from 'schema';
import { GetTodoPresenter, GetTodoOutputData } from 'domain-model';

import { toGqlTodo } from '../utils/converter/todo';

export class GqlGetTodoPresenter implements GetTodoPresenter {
  private response: Todo | null = null;

  public getResponse() {
    return this.response;
  }

  public async output(response: GetTodoOutputData) {
    this.response = toGqlTodo(response.todo);
  }
}
