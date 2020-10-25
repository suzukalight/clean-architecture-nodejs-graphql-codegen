import { DeadlineNearingTodosPresenter, DeadlineNearingTodosOutputData } from 'domain-model';

export class GqlDeadlineNearingTodosPresenter implements DeadlineNearingTodosPresenter {
  private response: DeadlineNearingTodosOutputData | null = null;

  public getResponse() {
    return this.response;
  }

  public async output(response: DeadlineNearingTodosOutputData) {
    this.response = response;
  }
}
