import { NotFoundError } from 'common';

import { CreateTodoInteractor } from '../CreateTodo';
import { MockTodoRepository } from '../__mocks__/MockTodoRepository';
import { MockCreateTodoPresenter } from '../__mocks__/MockTodoPresenter';
import { MockUserRepository } from '../../user/__mocks__/MockUserRepository';

/**
 * オーナーを1名作成しておく
 */
const setup = async () => {
  // user repository
  const userRepository = new MockUserRepository();
  const userEntity = await userRepository.create({ email: 'target@email.com' });
  const ownerId = userEntity.getId().toString();

  // todo interactor
  const todoRepository = new MockTodoRepository();
  const presenter = new MockCreateTodoPresenter();
  const interactor = new CreateTodoInteractor(todoRepository, userRepository, presenter);

  return { ownerId, interactor, presenter };
};

describe('CreateTodoInteractor', () => {
  test('リクエストを処理し、新しいエンティティを生成できた', async () => {
    const { ownerId, interactor, presenter } = await setup();
    const request = { ownerId, title: 'todo #1' };

    await interactor.handle(request);

    // response として request で指定したデータが得られた
    const response = presenter.getResponse();
    expect(response?.todo?.ownerId).toBe(request.ownerId);
    expect(response?.todo?.title).toBe(request.title);
  });

  test('存在しないオーナーを指定したため、失敗した', async () => {
    const { interactor } = await setup();
    const request = { ownerId: '99999', title: 'todo #1' };

    await expect(interactor.handle(request)).rejects.toThrow(NotFoundError);
  });
});
