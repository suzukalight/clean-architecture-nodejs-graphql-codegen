import { SignUpEmailPasswordResponse } from 'schema';
import { SignUpEmailPasswordPresenter, SignUpEmailPasswordOutputData } from 'domain-model';

import { toGqlUser } from '../utils/converter/user';

export class GqlSignUpEmailPasswordPresenter implements SignUpEmailPasswordPresenter {
  private response: SignUpEmailPasswordResponse | null = null;

  public getResponse() {
    return this.response;
  }

  public async output(response: SignUpEmailPasswordOutputData) {
    this.response = {
      token: response.token!,
      user: toGqlUser(response.user),
    };
  }
}
