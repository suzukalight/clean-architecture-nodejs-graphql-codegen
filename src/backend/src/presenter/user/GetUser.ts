import { Maybe, User } from 'schema/types';

import { GetUserPresenter as GetUserPresenterIF } from '../../usecase/user/presenter.interface';

export class GetUserPresenter implements GetUserPresenterIF {
  private response: Maybe<User> = null;

  public getResponse(): Maybe<User> {
    return this.response;
  }

  public async output(response: Maybe<User>) {
    this.response = response;
    return response;
  }
}
