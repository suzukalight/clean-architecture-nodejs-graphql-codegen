import { DeleteTodoResponse } from 'schema/lib/app/types';
import { DeleteTodoPresenter, DeleteTodoOutputData } from 'domain-model';

import { toGqlTodo } from '../utils/converter/todo';

export class GqlDeleteTodoPresenter implements DeleteTodoPresenter {
  private response: DeleteTodoResponse | null;

  public getResponse() {
    return this.response;
  }

  public async output(response: DeleteTodoOutputData) {
    this.response = { todo: toGqlTodo(response.todo)! };
  }
}
