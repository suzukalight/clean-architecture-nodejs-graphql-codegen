import { NotFoundError, ConflictError, UnauthorizedError } from 'common';

import { UndoneTodoInteractor } from '../UndoneTodo';
import { MockTodoRepository } from '../__mocks__/MockTodoRepository';
import { MockUndoneTodoPresenter, MockDoneTodoPresenter } from '../__mocks__/MockTodoPresenter';
import { MockUserRepository } from '../../user/__mocks__/MockUserRepository';
import { DoneTodoInteractor } from '../DoneTodo';
import { ID } from '../../../entity/common/ID';
import { UserEntity } from '../../../entity/user/UserEntity';
import { TodoStatus } from '../../../entity/todo/TodoDto';

/**
 * TODOを1つ作成しておく。
 * DONEにするInteractorも提供する。
 */
const setup = async () => {
  // user repository
  const userRepository = new MockUserRepository();
  const actor = await userRepository.create({ email: 'target@email.com' });

  // create todo
  const repository = new MockTodoRepository();
  const ownerId = actor.getId().toString();
  const todoEntity = await repository.create({ ownerId, title: 'todo #1' });
  const todoId = todoEntity.getId().toString();

  // undone interactor
  const undonePresenter = new MockUndoneTodoPresenter();
  const undoneInteractor = new UndoneTodoInteractor(repository, undonePresenter);

  // done interactor
  const donePresenter = new MockDoneTodoPresenter();
  const doneInteractor = new DoneTodoInteractor(repository, donePresenter);

  return { todoId, actor, undoneInteractor, undonePresenter, doneInteractor };
};

describe('UndoneTodoInteractor', () => {
  test('リクエストを処理し、TODOをUndoneにできた', async () => {
    const { todoId, actor, undoneInteractor, undonePresenter, doneInteractor } = await setup();
    const request = { id: todoId };
    await doneInteractor.handle(request, actor); // いちどDONEにする

    // UNDONEにできる
    await undoneInteractor.handle(request, actor);

    // response として request で指定したデータが得られた
    const response = undonePresenter.getResponse();
    expect(response?.todo?.status).toBe(TodoStatus.Undone);
  });

  test('すでにUNDONEにしているTODOを指定したため、エラーが返された', async () => {
    const { todoId, actor, undoneInteractor } = await setup();
    const request = { id: todoId };

    // DONEにせずに、UNDONEにすることはできない
    await expect(undoneInteractor.handle(request, actor)).rejects.toThrow(ConflictError);
  });

  test('存在しないIDを指定したため、エラーが返された', async () => {
    const { actor, undoneInteractor } = await setup();
    const request = { id: '99999' };

    await expect(undoneInteractor.handle(request, actor)).rejects.toThrow(NotFoundError);
  });

  test('作成した本人以外が操作したため、エラーが返された', async () => {
    const { todoId, actor, undoneInteractor } = await setup();
    const request = { id: todoId };

    const others = new UserEntity(actor.toDto());
    others.setId(new ID('99999'));

    await expect(undoneInteractor.handle(request, others)).rejects.toThrow(UnauthorizedError);
  });
});
