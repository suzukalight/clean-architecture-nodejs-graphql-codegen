import { CreateUserResponse } from 'schema/types';

type MayBeCreateUserResponse = CreateUserResponse | undefined;

export class CreateUserPresenter implements CreateUserPresenter {
  private response: MayBeCreateUserResponse;

  public getResponse(): MayBeCreateUserResponse {
    return this.response;
  }

  public async output(response: CreateUserResponse) {
    this.response = response;
    return response;
  }
}
