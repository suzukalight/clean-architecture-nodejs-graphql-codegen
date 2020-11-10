import { RoleTypes } from 'common';

import { GetUserByIdInteractor } from '../GetUserById';
import { MockUserQueryService } from '../_mocks/MockUserQueryService';
import { MockGetUserByIdPresenter } from '../_mocks/MockUserPresenter';
import { UserDto } from '../../../entity/user/UserDto';
import { UserEntity } from '../../../entity/user/UserEntity';

/**
 * TODOを3つ作成しておく
 */
const setup = async () => {
  // create users
  const users: UserDto[] = [1, 2, 3].map((id) => ({
    id: `${id}`,
    email: `user${id}@email.com`,
    roles: [RoleTypes.Member],
  }));
  const repository = new MockUserQueryService(users);
  const actor = new UserEntity(users[0]);

  // interactor
  const presenter = new MockGetUserByIdPresenter();
  const interactor = new GetUserByIdInteractor(repository, presenter);

  return { actor, interactor, presenter };
};

describe('AllUsersByOwnerIdInteractor', () => {
  test.each`
    id     | exists
    ${'1'} | ${true}
    ${'2'} | ${true}
    ${'3'} | ${true}
    ${'4'} | ${false}
  `(
    'OK: id=$idのエンティティは取得できるか？=$exists',
    async ({ id, exists }: { id: string; exists: boolean }) => {
      const { actor, interactor, presenter } = await setup();

      await interactor.handle({ id }, actor);

      // response として request で指定したデータが得られた
      const response = presenter.getResponse();
      expect(!!response?.user).toBe(exists);
    },
  );
});
