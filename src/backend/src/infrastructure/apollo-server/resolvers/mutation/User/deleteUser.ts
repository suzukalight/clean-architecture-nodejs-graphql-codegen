import { MutationResolvers } from 'schema/lib/app/types';
import { DeleteUserInteractor, allowOnlyWhenActorHasAdminOrMemberRole } from 'domain-model';

import { ApolloServerContext } from '../../../types';
import { GqlUserRepository } from '../../../../../repository/typeorm/user/repository/User';
import { GqlDeleteUserPresenter } from '../../../../../presenter/user/DeleteUser';

export const deleteUser: MutationResolvers<ApolloServerContext> = {
  deleteUser: async (_parent, args, { dbConnection, actor }) => {
    allowOnlyWhenActorHasAdminOrMemberRole(actor);

    const repository = new GqlUserRepository(dbConnection);
    const presenter = new GqlDeleteUserPresenter();
    const usecase = new DeleteUserInteractor(repository, presenter);

    await usecase.handle(args.input!, actor!);

    return presenter.getResponse();
  },
};
