import { CreateUserResponse, Maybe } from 'schema/types';
import { UserEntity } from 'domain-model/src/entity/user/UserEntity';
import { CreateUserPresenter as CreateUserPresenterIF } from 'domain-model/src/usecase/user/interface/presenter';

export class CreateUserPresenter implements CreateUserPresenterIF {
  private response: Maybe<CreateUserResponse> = null;

  public getResponse(): Maybe<CreateUserResponse> {
    return this.response;
  }

  public async output(userEntity: Maybe<UserEntity>) {
    this.response = userEntity ? { user: userEntity.toJSON() } : null;
  }
}
