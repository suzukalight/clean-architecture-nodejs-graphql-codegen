import { NotFoundError } from 'common/error/NotFound';
import { ConflictError } from 'common/error/Conflict';
import { TodoStatus } from 'schema/types';

import { UndoneTodoInteractor } from '../UndoneTodo';
import { MockTodoRepository } from '../__mocks__/MockTodoRepository';
import { MockUndoneTodoPresenter, MockDoneTodoPresenter } from '../__mocks__/MockTodoPresenter';
import { MockUserRepository } from '../../user/__mocks__/MockUserRepository';
import { DoneTodoInteractor } from '../DoneTodo';

/**
 * TODOを1つ作成しておく。
 * DONEにするInteractorも提供する。
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

  // undone interactor
  const undonePresenter = new MockUndoneTodoPresenter();
  const undoneInteractor = new UndoneTodoInteractor(repository, undonePresenter);

  // done interactor
  const donePresenter = new MockDoneTodoPresenter();
  const doneInteractor = new DoneTodoInteractor(repository, donePresenter);

  return { todoId, undoneInteractor, undonePresenter, doneInteractor };
};

describe('UndoneTodoInteractor', () => {
  it('リクエストを処理し、TODOをUndoneにできた', async () => {
    const { todoId, undoneInteractor, undonePresenter, doneInteractor } = await setup();

    // いちどDONEにする
    await doneInteractor.handle({ id: todoId });

    // UNDONEにする
    await undoneInteractor.handle({ id: todoId });

    // response として request で指定したデータが得られた
    const response = undonePresenter.getResponse();
    expect(response?.todo.status).toBe(TodoStatus.Undone);
  });

  it('すでにUNDONEにしているTODOを指定したため、エラーが返された', async () => {
    const { todoId, undoneInteractor } = await setup();

    try {
      // DONEにせずに、UNDONEにする
      await undoneInteractor.handle({ id: todoId });
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e).toBeInstanceOf(ConflictError);
    }
  });

  it('存在しないIDを指定したため、エラーが返された', async () => {
    const { undoneInteractor } = await setup();

    try {
      await undoneInteractor.handle({ id: '99999' });
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundError);
    }
  });
});
