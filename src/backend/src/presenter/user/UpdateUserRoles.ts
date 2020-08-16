import { UpdateUserRolesResponse, Maybe } from 'schema/types';
import { UserEntity } from 'domain-model/src/entity/user/UserEntity';
import { UpdateUserRolesPresenter as UpdateUserRolesPresenterIF } from 'domain-model/src/usecase/user/interface/presenter';

export class UpdateUserRolesPresenter implements UpdateUserRolesPresenterIF {
  private response: Maybe<UpdateUserRolesResponse> = null;

  public getResponse(): Maybe<UpdateUserRolesResponse> {
    return this.response;
  }

  public async output(userEntity: Maybe<UserEntity>) {
    this.response = userEntity ? { user: userEntity.toJSON() } : null;
  }
}
