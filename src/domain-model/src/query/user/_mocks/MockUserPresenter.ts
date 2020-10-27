import { GetUserByIdPresenter, GetUserByIdOutputData } from '../interface/presenter';

export class MockGetUserByIdPresenter implements GetUserByIdPresenter {
  private response: GetUserByIdOutputData | null = null;

  public getResponse() {
    return this.response;
  }

  public async output(response: GetUserByIdOutputData) {
    this.response = response;
  }
}
