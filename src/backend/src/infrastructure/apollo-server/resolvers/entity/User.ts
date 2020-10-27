import { UserResolvers } from 'schema';

import { GqlTodoQueryService } from '../../../../repository/typeorm/todo/queryService/Todo';

export const User: UserResolvers = {
  todos: async (parent, _args, ctx) => {
    const repository = new GqlTodoQueryService(ctx.dbConnection);
    const result = await repository.allTodosByOwnerId({ ownerId: parent.id });
    return result.todos;
  },
};
