import { MutationResolvers } from 'schema/lib/app/types';
import { DoneTodoInteractor, allowOnlyWhenActorHasMemberRole } from 'domain-model';

import { ApolloServerContext } from '../../../types';
import { GqlTodoRepository } from '../../../../../repository/typeorm/todo/repository/Todo';
import { GqlDoneTodoPresenter } from '../../../../../presenter/todo/DoneTodo';

export const doneTodo: MutationResolvers<ApolloServerContext> = {
  doneTodo: async (_parent, args, { dbConnection, actor }) => {
    allowOnlyWhenActorHasMemberRole(actor);

    const repository = new GqlTodoRepository(dbConnection);
    const presenter = new GqlDoneTodoPresenter();
    const usecase = new DoneTodoInteractor(repository, presenter);

    await usecase.handle(args.input!, actor!);

    return presenter.getResponse();
  },
};
