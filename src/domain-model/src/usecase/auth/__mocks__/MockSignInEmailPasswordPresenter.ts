import { Maybe, SignInEmailPasswordResponse } from 'schema/types';

import { SignInEmailPasswordPresenter } from '../interface/presenter';
import { UserEntity } from '../../../entity/user/UserEntity';

export class MockSignInEmailPasswordPresenter implements SignInEmailPasswordPresenter {
  private response: Maybe<SignInEmailPasswordResponse> = null;

  public getResponse(): Maybe<SignInEmailPasswordResponse> {
    return this.response;
  }

  public async output(token: string, user: UserEntity) {
    this.response = { token, user: user.toJSON() };
  }
}
