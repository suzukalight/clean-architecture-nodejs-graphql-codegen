import { Maybe, SignInEmailPasswordResponse, SignUpEmailPasswordResponse } from 'schema/types';

import { AuthPresenter } from '../interface/presenter';
import { UserEntity } from '../../../entity/user/UserEntity';

abstract class M<Response> implements AuthPresenter<Response> {
  protected response: Maybe<Response> = null;

  public getResponse(): Maybe<Response> {
    return this.response;
  }

  public abstract output(token: string, user: UserEntity): void;
}

export class MockSignInEmailPasswordPresenter extends M<SignInEmailPasswordResponse> {
  public output(token: string, user: UserEntity) {
    this.response = { token, user: user.toJSON() };
  }
}

export class MockSignUpEmailPasswordPresenter extends M<SignUpEmailPasswordResponse> {
  public output(token: string, user: UserEntity) {
    this.response = { token, user: user.toJSON() };
  }
}
