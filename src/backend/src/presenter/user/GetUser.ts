import { Maybe, User } from 'schema';
import { UserEntity, GetUserPresenter as GetUserPresenterIF } from 'domain-model';

export class GetUserPresenter implements GetUserPresenterIF {
  private response: Maybe<User> = null;

  public getResponse(): Maybe<User> {
    return this.response;
  }

  public async output(userEntity: Maybe<UserEntity>) {
    this.response = userEntity ? userEntity.toJSON() : null;
  }
}
