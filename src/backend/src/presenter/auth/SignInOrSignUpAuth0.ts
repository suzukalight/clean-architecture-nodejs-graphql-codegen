import { SignInOrSignUpAuth0Response } from 'schema';
import { SignInOrSignUpAuth0Presenter, SignInOrSignUpAuth0OutputData } from 'domain-model';

import { toGqlUser } from '../utils/converter/user';

export class GqlSignInOrSignUpAuth0Presenter implements SignInOrSignUpAuth0Presenter {
  private response: SignInOrSignUpAuth0Response | null = null;

  public getResponse() {
    return this.response;
  }

  public async output(response: SignInOrSignUpAuth0OutputData) {
    this.response = {
      user: toGqlUser(response.user),
      isNewUser: response.isNewUser,
    };
  }
}
