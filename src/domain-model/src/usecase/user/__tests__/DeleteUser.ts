import { NotFoundError, UnauthorizedError, RoleTypes } from 'common';

import { DeleteUserInteractor } from '../DeleteUser';
import { MockUserRepository } from '../_mocks/MockUserRepository';
import { MockDeleteUserPresenter } from '../_mocks/MockUserPresenter';
import { UserEntity } from '../../../entity/user/UserEntity';

/**
 * interactor を生成
 */
const setup = async () => {
  const repository = new MockUserRepository();
  const target = await repository.create({});

  const presenter = new MockDeleteUserPresenter();
  const interactor = new DeleteUserInteractor(repository, presenter);

  return { repository, target, interactor, presenter };
};

describe('DeleteUserInteractor', () => {
  test('成功：Adminロールで、エンティティの削除ができた', async () => {
    const { target, interactor, presenter } = await setup();
    const targetId = target.getId().getId();
    const actor = new UserEntity({
      id: `${targetId + 1}`,
      roles: [RoleTypes.Admin],
    });

    await interactor.handle({ id: targetId }, actor);

    const response = presenter.getResponse();
    expect(target.getId().isEqual(response?.user?.id)).toBeTruthy();
  });

  test('成功：自身に対して、エンティティの削除ができた', async () => {
    const { target, interactor, presenter } = await setup();
    const targetId = target.getId().getId();

    await interactor.handle({ id: targetId }, target);

    const response = presenter.getResponse();
    expect(target.getId().isEqual(response?.user?.id)).toBeTruthy();
  });

  test('失敗：存在しないIDを指定した', async () => {
    const { target, interactor } = await setup();
    const targetId = '99999';

    await expect(interactor.handle({ id: targetId }, target)).rejects.toThrow(NotFoundError);
  });

  test('失敗：Adminロールでないactorが操作した', async () => {
    const { target, interactor } = await setup();
    const targetId = target.getId().getId();
    const actor = new UserEntity({
      id: `${targetId + 1}`,
      roles: [RoleTypes.Member],
    });

    await expect(interactor.handle({ id: targetId }, actor)).rejects.toThrow(UnauthorizedError);
  });
});
