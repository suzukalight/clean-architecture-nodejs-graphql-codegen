import { NotFoundError } from 'common/error/NotFound';

import { DeleteTodoInteractor } from '../DeleteTodo';
import { MockTodoRepository } from '../__mocks__/MockTodoRepository';
import { MockDeleteTodoPresenter } from '../__mocks__/MockTodoPresenter';
import { MockUserRepository } from '../../user/__mocks__/MockUserRepository';

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
  const presenter = new MockDeleteTodoPresenter();
  const interactor = new DeleteTodoInteractor(repository, presenter);

  return { todoId, interactor, presenter };
};

describe('DeleteTodoInteractor', () => {
  test('リクエストを処理し、エンティティを削除できた', async () => {
    const { todoId, interactor, presenter } = await setup();
    const request = { id: todoId };

    await interactor.handle(request);

    // response として request で指定したデータが得られた
    const response = presenter.getResponse();
    expect(response?.todo.id).toBe(todoId);
  });

  test('存在しないIDを指定したため、エラーが返された', async () => {
    const { interactor } = await setup();
    const request = { id: '99999' };

    await expect(interactor.handle(request)).rejects.toThrow(NotFoundError);
  });
});
