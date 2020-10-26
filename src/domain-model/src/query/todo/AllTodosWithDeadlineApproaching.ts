import { TodoQueryService } from './interface/queryService';
import {
  AllTodosWithDeadlineApproachingInputData,
  AllTodosWithDeadlineApproachingUseCase,
} from './interface/usecase';
import {
  AllTodosWithDeadlineApproachingOutputData,
  AllTodosWithDeadlineApproachingPresenter,
} from './interface/presenter';
import { UserEntity } from '../../entity/user/UserEntity';

export class AllTodosWithDeadlineApproachingInteractor
  implements AllTodosWithDeadlineApproachingUseCase {
  private queryService: TodoQueryService;
  private presenter: AllTodosWithDeadlineApproachingPresenter;
  private daysBeforeWarning = 3;

  constructor(queryService: TodoQueryService, presenter: AllTodosWithDeadlineApproachingPresenter) {
    this.queryService = queryService;
    this.presenter = presenter;
  }

  public async handle(request: AllTodosWithDeadlineApproachingInputData, _actor: UserEntity) {
    // TODO: request をチェックする
    // TODO: actorをチェックする
    // TODO: actorがfetchできる対象をconditionとして払い出す

    const result = await this.queryService.allTodosWithDeadlineApproaching({
      dueDate: request.dueDate,
      daysBeforeWarning: this.daysBeforeWarning,
      paging: request?.paging,
    });

    const outputData: AllTodosWithDeadlineApproachingOutputData = {
      edges: result?.todos?.map((todo) => ({ todo, cursor: todo.id })) ?? null,
      pageInfo: result?.pageInfo,
    };
    this.presenter.output(outputData);
  }
}
