import { UpdateUserRolesResponse } from 'schema/lib/app/types';
import { UpdateUserRolesPresenter, UpdateUserRolesOutputData } from 'domain-model';

import { toGqlUser } from '../utils/converter/user';

export class GqlUpdateUserRolesPresenter implements UpdateUserRolesPresenter {
  private response: UpdateUserRolesResponse | null = null;

  public getResponse() {
    return this.response;
  }

  public async output(response: UpdateUserRolesOutputData) {
    this.response = { user: toGqlUser(response.user)! };
  }
}
