import { Maybe, UpdateUserRolesResponse, UpdateUserRolesRequest } from 'schema/types';
import { IllegalArgumentError } from 'common/error/IllegalArgument';
import { NotFoundError } from 'common/error/NotFound';

import { UserEntity } from '../../../entity/user/UserEntity';
import { UpdateUserRolesInteractor } from '../UpdateUserRoles';
import { UpdateUserRolesPresenter } from '../interface/presenter';
import { UserRepository, createInMemoryStore } from '../__mocks__/UserRepository';
import { RoleTypes } from '../../../entity/common/Role';

export class MockUpdateUserRolesPresenter implements UpdateUserRolesPresenter {
  private response: Maybe<UpdateUserRolesResponse> = null;

  public getResponse(): Maybe<UpdateUserRolesResponse> {
    return this.response;
  }

  public async output(user: UserEntity) {
    this.response = { user: user.toJSON() };
  }
}

describe('UpdateUserRolesInteractor', () => {
  const entities = new Map<string, UserEntity>();
  const id = '1';
  entities.set(id, new UserEntity({ id, email: 'target@email.com', roles: [RoleTypes.Anonymous] }));
  const store = createInMemoryStore(1, entities);

  const repository = new UserRepository(store);
  const presenter = new MockUpdateUserRolesPresenter();
  const interactor = new UpdateUserRolesInteractor(repository, presenter);

  test('リクエストを処理し、新しいロールを設定できた', async () => {
    const request = { id, roles: [RoleTypes.Member] };

    await interactor.handle(request);

    // response として request で指定したデータが得られた
    const response = presenter.getResponse();
    expect(response?.user?.roles).toEqual(request.roles);
  });

  test('存在しないIDを指定したため、失敗した', async () => {
    const request = { id: '255', roles: [RoleTypes.Member] };

    try {
      await interactor.handle(request);
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundError);
      return;
    }

    expect(true).toBeFalsy();
  });

  test('不正なロールを指定したため、失敗した', async () => {
    const request = ({ id, roles: ['hogehoge'] } as unknown) as UpdateUserRolesRequest;

    try {
      await interactor.handle(request);
    } catch (e) {
      expect(e).toBeInstanceOf(IllegalArgumentError);
      return;
    }

    expect(true).toBeFalsy();
  });
});
