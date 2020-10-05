import { NotFoundError, UnauthorizedError } from 'common';

import { DeleteTodoInteractor } from '../DeleteTodo';
import { MockTodoRepository } from '../__mocks__/MockTodoRepository';
import { MockDeleteTodoPresenter } from '../__mocks__/MockTodoPresenter';
import { MockUserRepository } from '../../user/__mocks__/MockUserRepository';
import { ID } from '../../../entity/common/ID';
import { UserEntity } from '../../../entity/user/UserEntity';

/**
 * TODOを1つ作成しておく
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

  // interactor
  const presenter = new MockDeleteTodoPresenter();
  const interactor = new DeleteTodoInteractor(repository, presenter);

  return { todoId, actor, interactor, presenter };
};

describe('DeleteTodoInteractor', () => {
  test('リクエストを処理し、エンティティを削除できた', async () => {
    const { todoId, actor, interactor, presenter } = await setup();
    const request = { id: todoId };

    await interactor.handle(request, actor);

    // response として request で指定したデータが得られた
    const response = presenter.getResponse();
    expect(response?.todo.id).toBe(todoId);
  });

  test('存在しないIDを指定したため、エラーが返された', async () => {
    const { actor, interactor } = await setup();
    const request = { id: '99999' };

    await expect(interactor.handle(request, actor)).rejects.toThrow(NotFoundError);
  });

  test('作成した本人以外が操作したため、エラーが返された', async () => {
    const { todoId, actor, interactor } = await setup();
    const request = { id: todoId };

    const others = new UserEntity(actor.toDto());
    others.setId(new ID('99999'));

    await expect(interactor.handle(request, others)).rejects.toThrow(UnauthorizedError);
  });
});
