import { UserResolvers } from 'schema/types';
import { TodoRepository } from '../../../../repository/typeorm/todo/repository/Todo';

export const User: UserResolvers = {
  todos: async (parent, args, ctx) => {
    const repository = new TodoRepository(ctx.dbConnection);
    const todoEntities = await repository.allByOwnerId(parent.id);
    return todoEntities ? todoEntities.map((todo) => todo.toJSON()) : null;
  },
};
