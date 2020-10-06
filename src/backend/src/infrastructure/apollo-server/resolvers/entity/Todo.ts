import { TodoResolvers } from 'schema';

import { GqlUserRepository } from '../../../../repository/typeorm/user/repository/User';
import { toGqlUser } from '../../../../presenter/utils/converter/user';

export const Todo: TodoResolvers = {
  owner: async (parent, args, ctx) => {
    const repository = new GqlUserRepository(ctx.dbConnection);
    const userEntity = await repository.getById(parent.ownerId); // FIXME: entity直接ではなく、usecaseを作ったほうが良い
    return userEntity ? toGqlUser(userEntity.toDto()) : null;
  },
};
