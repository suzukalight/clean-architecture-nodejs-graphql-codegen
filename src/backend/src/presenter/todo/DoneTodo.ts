import { DoneTodoResponse } from 'schema/lib/app/types';
import { DoneTodoPresenter, DoneTodoOutputData } from 'domain-model';

import { toGqlTodo } from '../utils/converter/todo';

export class GqlDoneTodoPresenter implements DoneTodoPresenter {
  private response: DoneTodoResponse | null;

  public getResponse() {
    return this.response;
  }

  public async output(response: DoneTodoOutputData) {
    this.response = { todo: toGqlTodo(response.todo)! };
  }
}
