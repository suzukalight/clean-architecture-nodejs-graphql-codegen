import { GetTodoInteractor } from '../GetTodo';
import { MockTodoRepository } from '../_mocks/MockTodoRepository';
import { MockGetTodoPresenter } from '../_mocks/MockTodoPresenter';
import { MockUserRepository } from '../../user/_mocks/MockUserRepository';

/**
 * TODOを1つ作成しておく
 */
const setup = async () => {
  // user repository
  const userRepository = new MockUserRepository();
  const userEntity = await userRepository.create({ email: 'target@email.com' });
  const ownerId = userEntity.getId().toString();

  // create todo
  const repository = new MockTodoRepository();
  const todoEntity = await repository.create({ ownerId, title: 'todo #1' });
  const todoId = todoEntity.getId().toString();

  // interactor
  const presenter = new MockGetTodoPresenter();
  const interactor = new GetTodoInteractor(repository, presenter);

  return { todoId, interactor, presenter };
};

describe('GetTodoInteractor', () => {
  test('リクエストを処理し、エンティティを取得できた', async () => {
    const { todoId, interactor, presenter } = await setup();

    await interactor.handle({ id: todoId });

    // response として request で指定したデータが得られた
    const response = presenter.getResponse();
    expect(response?.todo?.id).toBe(todoId);
  });

  test('存在しないIDを指定したため、nullが返された', async () => {
    const { interactor, presenter } = await setup();

    await interactor.handle({ id: '99999' });

    // response として null が得られた
    const response = presenter.getResponse();
    expect(response?.todo).toBeNull();
  });
});
