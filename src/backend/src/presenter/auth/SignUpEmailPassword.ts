import { Maybe, SignUpEmailPasswordResponse } from 'schema/types';
import { UserEntity } from 'domain-model/src/entity/user/UserEntity';
import { SignUpEmailPasswordPresenter as SignUpEmailPasswordPresenterIF } from 'domain-model/src/usecase/auth/interface/presenter';

export class SignUpEmailPasswordPresenter implements SignUpEmailPasswordPresenterIF {
  private response: Maybe<SignUpEmailPasswordResponse> = null;

  public getResponse(): Maybe<SignUpEmailPasswordResponse> {
    return this.response;
  }

  public async output(token: string, user: UserEntity) {
    this.response = { token, user: user.toJSON() };
  }
}
