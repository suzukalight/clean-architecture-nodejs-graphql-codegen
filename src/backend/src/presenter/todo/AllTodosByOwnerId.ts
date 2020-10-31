import { AllTodosByOwnerIdPresenter, AllTodosByOwnerIdOutputData } from 'domain-model';

export class GqlAllTodosByOwnerIdPresenter implements AllTodosByOwnerIdPresenter {
  private response: AllTodosByOwnerIdOutputData | null = null; // NOTE: 対応するqueryがないため、OutputData を保持

  public getResponse() {
    return this.response;
  }

  public async output(response: AllTodosByOwnerIdOutputData) {
    this.response = response;
  }
}
