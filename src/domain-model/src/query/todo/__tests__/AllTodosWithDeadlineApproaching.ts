import { AllTodosWithDeadlineApproachingInteractor } from '../AllTodosWithDeadlineApproaching';
import { MockTodoQueryService } from '../__mocks__/MockTodoQueryService';
import { MockAllTodosWithDeadlineApproachingPresenter } from '../__mocks__/MockTodoPresenter';
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
    dueDate: new Date(`2020-0${id}-01`),
  }));
  const repository = new MockTodoQueryService(todos);

  // interactor
  const presenter = new MockAllTodosWithDeadlineApproachingPresenter();
  const interactor = new AllTodosWithDeadlineApproachingInteractor(repository, presenter);

  return { actor, interactor, presenter };
};

describe('AllTodosWithDeadlineApproachingInteractor', () => {
  test('OK: リクエストを処理し、エンティティを取得できた', async () => {
    const { actor, interactor, presenter } = await setup();

    const dueDate = new Date('2020-10-01');
    await interactor.handle({ dueDate }, actor);

    // response として request で指定したデータが得られた
    const response = presenter.getResponse();
    expect(response?.edges?.length).toBe(3);
  });

  test.todo('OK: dueDateを 2020-01-03 に変更して、エンティティを取得');
  test.todo('OK: dueDateを 2020-01-04 に変更して、エンティティを取得');
  test.todo('OK: dueDateを 2020-01-05 に変更して、エンティティを取得');

  test.todo('OK: actorを変えて、エンティティを取得');
  test.todo('OK: actorを変えて、エンティティを0件取得');

  test.todo('NG: 無効なactor');
  test.todo('NG: 無効なdueDate');
});
