import {
  AllTodosWithDeadlineApproachingPresenter,
  AllTodosWithDeadlineApproachingOutputData,
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
