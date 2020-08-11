import { CreateUserResponse, Maybe } from 'schema/types';

import { CreateUserPresenter as CreateUserPresenterIF } from '../../usecase/user/presenter.interface';

export class CreateUserPresenter implements CreateUserPresenterIF {
  private response: Maybe<CreateUserResponse> = null;

  public getResponse(): Maybe<CreateUserResponse> {
    return this.response;
  }

  public async output(response: CreateUserResponse) {
    this.response = response;
    return response;
  }
}
