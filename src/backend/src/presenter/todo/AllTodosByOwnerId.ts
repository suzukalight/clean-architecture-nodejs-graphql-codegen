import { AllTodosByOwnerIdPresenter, AllTodosByOwnerIdOutputData } from 'domain-model';

export class GqlAllTodosByOwnerIdPresenter implements AllTodosByOwnerIdPresenter {
  private response: AllTodosByOwnerIdOutputData | null = null;

  public getResponse() {
    return this.response;
  }

  public async output(response: AllTodosByOwnerIdOutputData) {
    this.response = response;
  }
}
