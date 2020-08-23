import { MutationResolvers } from 'schema/types';
import { DoneTodoInteractor } from 'domain-model/src/usecase/todo/DoneTodo';
import { allowOnlyWhenActorHasMemberRole } from 'domain-model/src/policy/decision/common';

import { ApolloServerContext } from '../../../types';
import { TodoRepository } from '../../../../../repository/typeorm/Todo';
import { DoneTodoPresenter } from '../../../../../presenter/todo/DoneTodo';

export const doneTodo: MutationResolvers<ApolloServerContext> = {
  doneTodo: async (_parent, args, { dbConnection, actor }) => {
    allowOnlyWhenActorHasMemberRole(actor);

    const repository = new TodoRepository(dbConnection);
    const presenter = new DoneTodoPresenter();
    const usecase = new DoneTodoInteractor(repository, presenter);

    await usecase.handle(args.input!, actor);

    return presenter.getResponse()!;
  },
};
