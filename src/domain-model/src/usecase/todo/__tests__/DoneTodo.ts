import { NotFoundError } from 'common/error/NotFound';
import { ConflictError } from 'common/error/Conflict';
import { TodoStatus } from 'schema/types';

import { DoneTodoInteractor } from '../DoneTodo';
import { MockTodoRepository } from '../__mocks__/MockTodoRepository';
import { MockDoneTodoPresenter } from '../__mocks__/MockTodoPresenter';
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
  const presenter = new MockDoneTodoPresenter();
  const interactor = new DoneTodoInteractor(repository, presenter);

  return { todoId, interactor, presenter };
};

describe('DoneTodoInteractor', () => {
  it('リクエストを処理し、TODOをDoneにできた', async () => {
    const { todoId, interactor, presenter } = await setup();

    await interactor.handle({ id: todoId });

    // response として request で指定したデータが得られた
    const response = presenter.getResponse();
    expect(response?.todo.status).toBe(TodoStatus.Done);
  });

  it('すでにDONEにしているTODOを指定したため、エラーが返された', async () => {
    const { todoId, interactor } = await setup();

    // 一度DONEにする
    await interactor.handle({ id: todoId });

    try {
      // もう一度DONEにはできない
      await interactor.handle({ id: todoId });
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e).toBeInstanceOf(ConflictError);
    }
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
