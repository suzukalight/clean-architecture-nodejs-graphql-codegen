import { Connection } from 'typeorm';
import { UserEntity } from 'domain-model';

import { GqlTodoRepository } from '../../../repository/typeorm/todo/repository/Todo';

/**
 * 指定されたユーザのTODOアイテムを作成
 * @param dbConnection
 * @param user
 * @param title
 */
export const seedTodo = async (dbConnection: Connection, user: UserEntity, title?: string) => {
  const repository = new GqlTodoRepository(dbConnection);

  const todo = { ownerId: user.getId().toString(), title: title || `todo` };

  return repository.create(todo);
};
