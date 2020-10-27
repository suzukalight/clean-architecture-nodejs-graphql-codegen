import { TodoQueryService } from './interface/queryService';
import { AllTodosByOwnerIdInputData, AllTodosByOwnerIdUseCase } from './interface/usecase';
import { AllTodosByOwnerIdOutputData, AllTodosByOwnerIdPresenter } from './interface/presenter';
import { UserEntity } from '../../entity/user/UserEntity';
import { denyIfNotSet } from '../../policy';

export class AllTodosByOwnerIdInteractor implements AllTodosByOwnerIdUseCase {
  private queryService: TodoQueryService;
  private presenter: AllTodosByOwnerIdPresenter;
  private daysBeforeWarning = 3;

  constructor(queryService: TodoQueryService, presenter: AllTodosByOwnerIdPresenter) {
    this.queryService = queryService;
    this.presenter = presenter;
  }

  public async handle(request: AllTodosByOwnerIdInputData, actor: UserEntity) {
    denyIfNotSet(request, ['ownerId']);
    denyIfNotSet(actor, ['id']);

    // TODO: actorがfetchできる対象をconditionとして払い出す
    const result = await this.queryService.allTodosByOwnerId({
      ownerId: request.ownerId,
      paging: request?.paging,
    });

    const outputData: AllTodosByOwnerIdOutputData = {
      edges: result?.todos?.map((todo) => ({ todo, cursor: todo.id })) ?? null,
      pageInfo: result?.pageInfo,
    };
    this.presenter.output(outputData);
  }
}
