import { TodoResolvers } from 'schema/types';
import { UserRepository } from '../../../../repository/typeorm/User';

export const Todo: TodoResolvers = {
  owner: async (parent, args, ctx) => {
    const repository = new UserRepository(ctx.dbConnection);
    const userEntity = await repository.getById(parent.ownerId);
    return userEntity ? userEntity.toJSON() : null;
  },
};
