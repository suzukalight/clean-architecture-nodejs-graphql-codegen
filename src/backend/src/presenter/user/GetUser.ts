import { Maybe, User } from 'schema/types';
import { UserEntity } from 'domain-model/src/entity/user/UserEntity';

import { GetUserPresenter as GetUserPresenterIF } from '../../usecase/user/interface/presenter';

export class GetUserPresenter implements GetUserPresenterIF {
  private response: Maybe<User> = null;

  public getResponse(): Maybe<User> {
    return this.response;
  }

  public async output(userEntity: Maybe<UserEntity>) {
    this.response = userEntity ? userEntity.toJSON() : null;
  }
}
