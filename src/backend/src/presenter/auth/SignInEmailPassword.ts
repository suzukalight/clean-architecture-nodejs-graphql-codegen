import { Maybe, SignInEmailPasswordResponse } from 'schema/types';
import { UserEntity } from 'domain-model/src/entity/user/UserEntity';
import { SignInEmailPasswordPresenter as SignInEmailPasswordPresenterIF } from 'domain-model/src/usecase/auth/interface/presenter';

export class SignInEmailPasswordPresenter implements SignInEmailPasswordPresenterIF {
  private response: Maybe<SignInEmailPasswordResponse> = null;

  public getResponse(): Maybe<SignInEmailPasswordResponse> {
    return this.response;
  }

  public async output(token: string, user: UserEntity) {
    this.response = { token, user: user.toJSON() };
  }
}
