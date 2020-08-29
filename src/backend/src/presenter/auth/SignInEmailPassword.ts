import { Maybe, SignInEmailPasswordResponse } from 'schema';
import {
  UserEntity,
  SignInEmailPasswordPresenter as SignInEmailPasswordPresenterIF,
} from 'domain-model';

export class SignInEmailPasswordPresenter implements SignInEmailPasswordPresenterIF {
  private response: Maybe<SignInEmailPasswordResponse> = null;

  public getResponse(): Maybe<SignInEmailPasswordResponse> {
    return this.response;
  }

  public async output(token: string, user: UserEntity) {
    this.response = { token, user: user.toJSON() };
  }
}
