import { CreateUserResponse } from 'schema';
import { CreateUserPresenter, CreateUserOutputData } from 'domain-model';

import { toGqlUser } from '../utils/converter/user';

export class GqlCreateUserPresenter implements CreateUserPresenter {
  private response: CreateUserResponse | null = null;

  public getResponse() {
    return this.response;
  }

  public async output(response: CreateUserOutputData) {
    this.response = {
      user: toGqlUser(response.user),
    };
  }
}
