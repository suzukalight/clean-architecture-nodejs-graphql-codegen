import { MutationResolvers } from 'schema/types';
import { UpdateUserRolesInteractor } from 'domain-model/src/usecase/user/UpdateUserRoles';
import { allowOnlyWhenActorHasMemberRole } from 'domain-model/src/policy/decision/common';

import { ApolloServerContext } from '../../../types';
import { UserRepository } from '../../../../../repository/typeorm/User';
import { UpdateUserRolesPresenter } from '../../../../../presenter/user/UpdateUserRoles';

export const updateUserRoles: MutationResolvers<ApolloServerContext> = {
  updateUserRoles: async (_parent, args, { dbConnection, actor }) => {
    allowOnlyWhenActorHasMemberRole(actor);

    const repository = new UserRepository(dbConnection);
    const presenter = new UpdateUserRolesPresenter();
    const usecase = new UpdateUserRolesInteractor(repository, presenter);

    await usecase.handle(args.input!);

    return presenter.getResponse()!;
  },
};
