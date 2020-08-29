import { UpdateUserRolesResponse, Maybe } from 'schema';
import { UserEntity, UpdateUserRolesPresenter as UpdateUserRolesPresenterIF } from 'domain-model';

export class UpdateUserRolesPresenter implements UpdateUserRolesPresenterIF {
  private response: Maybe<UpdateUserRolesResponse> = null;

  public getResponse(): Maybe<UpdateUserRolesResponse> {
    return this.response;
  }

  public async output(userEntity: Maybe<UserEntity>) {
    this.response = userEntity ? { user: userEntity.toJSON() } : null;
  }
}
