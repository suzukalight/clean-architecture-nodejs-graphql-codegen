import { UpdateUserRolesRequest } from 'schema/types';
import { IllegalArgumentError } from 'common/error/IllegalArgument';
import { NotFoundError } from 'common/error/NotFound';

import { UpdateUserRolesInteractor } from '../UpdateUserRoles';
import { UserRepository } from '../__mocks__/UserRepository';
import { RoleTypes } from '../../../entity/common/Role';
import { MockUpdateUserRolesPresenter } from '../__mocks__/MockUserPresenter';

/**
 * ユーザを1名作成しておく
 */
const setup = async () => {
  // repository
  const repository = new UserRepository();
  const userEntity = await repository.create({ email: 'target@email.com' });
  const userId = userEntity.getID().toString();

  // interactor
  const presenter = new MockUpdateUserRolesPresenter();
  const interactor = new UpdateUserRolesInteractor(repository, presenter);

  return { userId, interactor, presenter };
};

describe('UpdateUserRolesInteractor', () => {
  test('リクエストを処理し、新しいロールを設定できた', async () => {
    const { userId, interactor, presenter } = await setup();
    const request = { id: userId, roles: [RoleTypes.Member] };

    await interactor.handle(request);

    // response として request で指定したデータが得られた
    const response = presenter.getResponse();
    expect(response?.user?.roles).toEqual(request.roles);
  });

  test('存在しないIDを指定したため、失敗した', async () => {
    const { interactor } = await setup();
    const request = { id: '255', roles: [RoleTypes.Member] };

    try {
      await interactor.handle(request);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundError);
    }
  });

  test('不正なロールを指定したため、失敗した', async () => {
    const { userId, interactor } = await setup();
    const request = ({ id: userId, roles: ['hogehoge'] } as unknown) as UpdateUserRolesRequest;

    try {
      await interactor.handle(request);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e).toBeInstanceOf(IllegalArgumentError);
    }
  });
});
