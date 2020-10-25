import {
  DeadlineNearingTodosPresenter,
  DeadlineNearingTodosOutputData,
} from '../interface/presenter';

export class MockDeadlineNearingTodosPresenter implements DeadlineNearingTodosPresenter {
  private response: DeadlineNearingTodosOutputData | null = null;

  public getResponse() {
    return this.response;
  }

  public async output(response: DeadlineNearingTodosOutputData) {
    this.response = response;
  }
}
