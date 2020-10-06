import {
  GetUserPresenter,
  CreateUserPresenter,
  UpdateUserRolesPresenter,
  UpdateUserRolesOutputData,
  GetUserOutputData,
  CreateUserOutputData,
} from '../interface/presenter';

export class MockGetUserPresenter implements GetUserPresenter {
  private response: GetUserOutputData | null = null;

  public getResponse() {
    return this.response;
  }

  public async output(response: GetUserOutputData) {
    this.response = response;
  }
}

export class MockCreateUserPresenter implements CreateUserPresenter {
  private response: CreateUserOutputData | null = null;

  public getResponse() {
    return this.response;
  }

  public async output(response: CreateUserOutputData) {
    this.response = response;
  }
}

export class MockUpdateUserRolesPresenter implements UpdateUserRolesPresenter {
  private response: UpdateUserRolesOutputData | null = null;

  public getResponse() {
    return this.response;
  }

  public async output(response: UpdateUserRolesOutputData) {
    this.response = response;
  }
}
