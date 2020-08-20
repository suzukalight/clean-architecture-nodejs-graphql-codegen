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
  it('リクエストを処理し、エンティティを削除できた', async () => {
    const { todoId, interactor, presenter } = await setup();

    await interactor.handle({ id: todoId });

    // response として request で指定したデータが得られた
    const response = presenter.getResponse();
    expect(response?.todo.id).toBe(todoId);
  });

  it('存在しないIDを指定したため、エラーが返された', async () => {
    const { interactor } = await setup();

    try {
      await interactor.handle({ id: '99999' });
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundError);
    }
  });
});
