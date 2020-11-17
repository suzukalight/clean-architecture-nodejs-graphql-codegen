import { MutationResolvers } from 'schema/lib/app/types';
import { UndoneTodoInteractor, allowOnlyWhenActorHasMemberRole } from 'domain-model';

import { ApolloServerContext } from '../../../types';
import { GqlTodoRepository } from '../../../../../repository/typeorm/todo/repository/Todo';
import { GqlUndoneTodoPresenter } from '../../../../../presenter/todo/UndoneTodo';

export const undoneTodo: MutationResolvers<ApolloServerContext> = {
  undoneTodo: async (_parent, args, { dbConnection, actor }) => {
    allowOnlyWhenActorHasMemberRole(actor);

    const repository = new GqlTodoRepository(dbConnection);
    const presenter = new GqlUndoneTodoPresenter();
    const usecase = new UndoneTodoInteractor(repository, presenter);

    await usecase.handle(args.input!, actor!);

    return presenter.getResponse();
  },
};
