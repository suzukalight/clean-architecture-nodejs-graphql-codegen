import { AllTodosWithDeadlineApproachingResponse } from 'schema/lib/app/types';
import {
  AllTodosWithDeadlineApproachingPresenter,
  AllTodosWithDeadlineApproachingOutputData,
} from 'domain-model';

export class GqlAllTodosWithDeadlineApproachingPresenter
  implements AllTodosWithDeadlineApproachingPresenter {
  private response: AllTodosWithDeadlineApproachingResponse | null = null;

  public getResponse() {
    return this.response;
  }

  public async output(response: AllTodosWithDeadlineApproachingOutputData) {
    this.response = response; // NOTE: TodoとTodoDtoが完全互換なので代入できている
  }
}
