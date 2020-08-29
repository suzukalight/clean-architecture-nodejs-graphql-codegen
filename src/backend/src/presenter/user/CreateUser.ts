import { CreateUserResponse, Maybe } from 'schema';
import { UserEntity, CreateUserPresenter as CreateUserPresenterIF } from 'domain-model';

export class CreateUserPresenter implements CreateUserPresenterIF {
  private response: Maybe<CreateUserResponse> = null;

  public getResponse(): Maybe<CreateUserResponse> {
    return this.response;
  }

  public async output(userEntity: Maybe<UserEntity>) {
    this.response = userEntity ? { user: userEntity.toJSON() } : null;
  }
}
