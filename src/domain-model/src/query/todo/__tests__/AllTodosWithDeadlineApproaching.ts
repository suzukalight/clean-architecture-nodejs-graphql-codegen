import { AllTodosWithDeadlineApproachingInteractor } from '../AllTodosWithDeadlineApproaching';
import { MockTodoQueryService } from '../_mocks/MockTodoQueryService';
import { MockAllTodosWithDeadlineApproachingPresenter } from '../_mocks/MockTodoPresenter';
import { TodoDto, TodoStatus } from '../../../entity/todo/TodoDto';
import { UserEntity } from '../../../entity/user/UserEntity';
import { RoleTypes } from '../../../entity/common/Role';

/**
 * TODOを3つ作成しておく
 */
const setup = async () => {
  // user repository
  const actor = new UserEntity({
    id: '1',
    email: 'target@email.com',
    roles: [RoleTypes.Member],
  });

  // create todos
  const todos: TodoDto[] = [1, 2, 3].map((id) => ({
    id: `${id}`,
    ownerId: '1',
    title: `TODO #${id}`,
    status: TodoStatus.Undone,
    dueDate: new Date(`2020-01-1${id}T00:00Z`),
  }));
  const repository = new MockTodoQueryService(todos);

  // interactor
  const presenter = new MockAllTodosWithDeadlineApproachingPresenter();
  const interactor = new AllTodosWithDeadlineApproachingInteractor(repository, presenter);

  return { actor, interactor, presenter };
};

describe('AllTodosWithDeadlineApproachingInteractor', () => {
  test.each`
    dueDate         | length
    ${'2019-10-01T00:00Z'} | ${0}
    ${'2020-01-07T00:00Z'} | ${0}
    ${'2020-01-08T00:00Z'} | ${1}
    ${'2020-01-09T00:00Z'} | ${2}
    ${'2020-01-10T00:00Z'} | ${3}
    ${'2020-01-11T00:00Z'} | ${3}
    ${'2021-01-01T00:00Z'} | ${3}
  `(
    'OK: dueDate=$dueDateのとき、エンティティを$length件取得できた',
    async ({ dueDate, length }: { dueDate: string; length: number }) => {
      const { actor, interactor, presenter } = await setup();

      await interactor.handle({ dueDate: new Date(dueDate) }, actor);

      // response として request で指定したデータが得られた
      const response = presenter.getResponse();
      expect(response?.edges?.length).toBe(length);
    },
  );

  test.todo('OK: actorを変えて、エンティティを取得');
  test.todo('OK: actorを変えて、エンティティを0件取得');

  test.todo('NG: 無効なactor');
  test.todo('NG: 無効なdueDate');
});
