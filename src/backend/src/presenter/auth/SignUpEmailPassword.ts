import { Maybe, SignUpEmailPasswordResponse } from 'schema';
import {
  UserEntity,
  SignUpEmailPasswordPresenter as SignUpEmailPasswordPresenterIF,
} from 'domain-model';

export class SignUpEmailPasswordPresenter implements SignUpEmailPasswordPresenterIF {
  private response: Maybe<SignUpEmailPasswordResponse> = null;

  public getResponse(): Maybe<SignUpEmailPasswordResponse> {
    return this.response;
  }

  public async output(token: string, user: UserEntity) {
    this.response = { token, user: user.toJSON() };
  }
}
