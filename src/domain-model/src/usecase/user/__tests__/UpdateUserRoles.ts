import { IllegalArgumentError, NotFoundError, UnauthorizedError, RoleTypes, ID } from 'common';

import { UpdateUserRolesInteractor } from '../UpdateUserRoles';
import { MockUserRepository } from '../_mocks/MockUserRepository';
import { MockUpdateUserRolesPresenter } from '../_mocks/MockUserPresenter';
import { UserEntity } from '../../../entity/user/UserEntity';
import { UpdateUserRolesInputData } from '../interface/usecase';

/**
 * ユーザを1名作成しておく
 */
const setup = async () => {
  // repository
  const repository = new MockUserRepository();
  const actor = await repository.create({});

  // interactor
  const presenter = new MockUpdateUserRolesPresenter();
  const interactor = new UpdateUserRolesInteractor(repository, presenter);

  return { actor, interactor, presenter };
};

describe('UpdateUserRolesInteractor', () => {
  test('リクエストを処理し、新しいロールを設定できた', async () => {
    const { actor, interactor, presenter } = await setup();
    const request = { id: actor.getId().toString(), roles: [RoleTypes.Member] };

    await interactor.handle(request, actor);

    // response として request で指定したデータが得られた
    const response = presenter.getResponse();
    expect(response?.user?.roles).toEqual(request.roles);
  });

  test('存在しないIDを指定したため、失敗した', async () => {
    const { actor, interactor } = await setup();
    const request = { id: '255', roles: [RoleTypes.Member] };

    await expect(interactor.handle(request, actor)).rejects.toThrow(NotFoundError);
  });

  test('不正なロールを指定したため、失敗した', async () => {
    const { actor, interactor } = await setup();
    const request = ({
      id: actor.getId().toString(),
      roles: ['hogehoge'],
    } as unknown) as UpdateUserRolesInputData;

    await expect(interactor.handle(request, actor)).rejects.toThrow(IllegalArgumentError);
  });

  test('本人以外が操作したため、エラーが返された', async () => {
    const { actor, interactor } = await setup();
    const request = { id: actor.getId().toString(), roles: [RoleTypes.Member] };

    const others = new UserEntity(actor.toDto());
    others.setId(new ID('99999'));

    await expect(interactor.handle(request, others)).rejects.toThrow(UnauthorizedError);
  });
});
