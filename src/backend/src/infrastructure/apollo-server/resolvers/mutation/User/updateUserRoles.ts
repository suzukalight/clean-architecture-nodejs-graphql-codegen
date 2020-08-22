import { MutationResolvers } from 'schema/types';
import { UpdateUserRolesInteractor } from 'domain-model/src/usecase/user/UpdateUserRoles';

import { ApolloServerContext } from '../../type';
import { UserRepository } from '../../../../../repository/typeorm/User';
import { UpdateUserRolesPresenter } from '../../../../../presenter/user/UpdateUserRoles';

export const updateUserRoles: MutationResolvers<ApolloServerContext> = {
  updateUserRoles: async (_parent, args, { dbConnection }) => {
    const repository = new UserRepository(dbConnection);
    const presenter = new UpdateUserRolesPresenter();
    const usecase = new UpdateUserRolesInteractor(repository, presenter);

    await usecase.handle(args.input!);

    return presenter.getResponse()!;
  },
};
