import { UserResolvers } from 'schema';

import { GqlTodoRepository } from '../../../../repository/typeorm/todo/repository/Todo';

export const User: UserResolvers = {
  todos: async (parent, _args, ctx) => {
    const repository = new GqlTodoRepository(ctx.dbConnection);
    const todoEntities = await repository.allByOwnerId(parent.id);
    return todoEntities ? todoEntities.map((todo) => todo.toDto()) : null;
  },
};
