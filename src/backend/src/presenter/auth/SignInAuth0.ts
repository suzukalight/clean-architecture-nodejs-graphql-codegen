import { SignInAuth0Response } from 'schema';
import { SignInAuth0Presenter, SignInAuth0OutputData } from 'domain-model';

import { toGqlUser } from '../utils/converter/user';

export class GqlSignInAuth0Presenter implements SignInAuth0Presenter {
  private response: SignInAuth0Response | null = null;

  public getResponse() {
    return this.response;
  }

  public async output(response: SignInAuth0OutputData) {
    this.response = {
      token: response.token!,
      user: toGqlUser(response.user),
    };
  }
}
