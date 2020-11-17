import { RoleTypes } from 'common';

import { AllTodosByOwnerIdInteractor } from '../AllTodosByOwnerId';
import { MockTodoQueryService } from '../_mocks/MockTodoQueryService';
import { MockAllTodosByOwnerIdPresenter } from '../_mocks/MockTodoPresenter';
import { TodoDto, TodoStatus } from '../../../entity/todo/TodoDto';
import { UserEntity } from '../../../entity/user/UserEntity';

/**
 * TODOを3つ作成しておく
 */
const setup = async () => {
  // user repository
  const actor = new UserEntity({
    id: '1',
    roles: [RoleTypes.Member],
  });

  // create todos
  const todos: TodoDto[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((id) => ({
    id: `${id}`,
    ownerId: `${(id % 4) + 1}`,
    title: `TODO #${id}`,
    status: TodoStatus.Undone,
    dueDate: new Date(`2020-01-10T00:00Z`),
  }));
  const repository = new MockTodoQueryService(todos);

  // interactor
  const presenter = new MockAllTodosByOwnerIdPresenter();
  const interactor = new AllTodosByOwnerIdInteractor(repository, presenter);

  return { actor, interactor, presenter };
};

describe('AllTodosByOwnerIdInteractor', () => {
  test.each`
    ownerId | length
    ${'1'}  | ${3}
    ${'2'}  | ${3}
    ${'3'}  | ${2}
    ${'4'}  | ${2}
    ${'5'}  | ${0}
  `(
    'OK: ownerId=$ownerIdのとき、エンティティを$length件取得できた',
    async ({ ownerId, length }: { ownerId: string; length: number }) => {
      const { actor, interactor, presenter } = await setup();

      await interactor.handle({ ownerId }, actor);

      // response として request で指定したデータが得られた
      const response = presenter.getResponse();
      expect(response?.edges?.length).toBe(length);
    },
  );

  test.todo('OK: actorを変えて、エンティティを取得');
  test.todo('OK: actorを変えて、エンティティを0件取得');

  test.todo('NG: 無効なactor');
  test.todo('NG: 無効なownerId');
});
