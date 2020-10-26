import {
  AllTodosWithDeadlineApproachingPresenter,
  AllTodosWithDeadlineApproachingOutputData,
} from 'domain-model';

export class GqlAllTodosWithDeadlineApproachingPresenter
  implements AllTodosWithDeadlineApproachingPresenter {
  private response: AllTodosWithDeadlineApproachingOutputData | null = null;

  public getResponse() {
    return this.response;
  }

  public async output(response: AllTodosWithDeadlineApproachingOutputData) {
    this.response = response;
  }
}
