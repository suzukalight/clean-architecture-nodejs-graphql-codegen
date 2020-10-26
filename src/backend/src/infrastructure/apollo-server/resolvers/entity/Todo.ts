import { TodoResolvers } from 'schema';

import { ApolloServerContext } from '../../types';
import { GqlUserRepository } from '../../../../repository/typeorm/user/repository/User';
import { toGqlUser } from '../../../../presenter/utils/converter/user';

export const Todo: TodoResolvers<ApolloServerContext> = {
  owner: async (parent, _args, { dbConnection }) => {
    if (parent?.owner?.id) return parent.owner;

    const repository = new GqlUserRepository(dbConnection);
    const userEntity = await repository.getById(parent.ownerId); // FIXME: entity直接ではなく、usecaseを作ったほうが良い
    return userEntity ? toGqlUser(userEntity.toDto()) : null;
  },
};
