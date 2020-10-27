import {
  AllTodosWithDeadlineApproachingPresenter,
  AllTodosWithDeadlineApproachingOutputData,
  AllTodosByOwnerIdPresenter,
  AllTodosByOwnerIdOutputData,
} from '../interface/presenter';

export class MockAllTodosWithDeadlineApproachingPresenter
  implements AllTodosWithDeadlineApproachingPresenter {
  private response: AllTodosWithDeadlineApproachingOutputData | null = null;

  public getResponse() {
    return this.response;
  }

  public async output(response: AllTodosWithDeadlineApproachingOutputData) {
    this.response = response;
  }
}

export class MockAllTodosByOwnerIdPresenter implements AllTodosByOwnerIdPresenter {
  private response: AllTodosByOwnerIdOutputData | null = null;

  public getResponse() {
    return this.response;
  }

  public async output(response: AllTodosByOwnerIdOutputData) {
    this.response = response;
  }
}
