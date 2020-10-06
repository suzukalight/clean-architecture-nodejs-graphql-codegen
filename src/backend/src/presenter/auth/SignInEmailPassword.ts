import { SignInEmailPasswordResponse } from 'schema';
import { SignInEmailPasswordPresenter, SignInEmailPasswordOutputData } from 'domain-model';

import { toGqlUser } from '../utils/converter/user';

export class GqlSignInEmailPasswordPresenter implements SignInEmailPasswordPresenter {
  private response: SignInEmailPasswordResponse | null = null;

  public getResponse() {
    return this.response;
  }

  public async output(response: SignInEmailPasswordOutputData) {
    this.response = {
      token: response.token!,
      user: toGqlUser(response.user),
    };
  }
}
