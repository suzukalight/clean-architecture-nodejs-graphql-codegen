import { SignUpAuth0Response } from 'schema';
import { SignUpAuth0Presenter, SignUpAuth0OutputData } from 'domain-model';

import { toGqlUser } from '../utils/converter/user';

export class GqlSignUpAuth0Presenter implements SignUpAuth0Presenter {
  private response: SignUpAuth0Response | null = null;

  public getResponse() {
    return this.response;
  }

  public async output(response: SignUpAuth0OutputData) {
    this.response = {
      token: response.token!,
      user: toGqlUser(response.user),
    };
  }
}
