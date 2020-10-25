import { TodoQueryService } from './interface/queryService';
import { DeadlineNearingTodosInputData, DeadlineNearingTodosUseCase } from './interface/usecase';
import {
  DeadlineNearingTodosOutputData,
  DeadlineNearingTodosPresenter,
} from './interface/presenter';
import { UserEntity } from '../../entity/user/UserEntity';

export class DeadlineNearingTodosInteractor implements DeadlineNearingTodosUseCase {
  private queryService: TodoQueryService;
  private presenter: DeadlineNearingTodosPresenter;
  private daysBeforeWarning = 3;

  constructor(queryService: TodoQueryService, presenter: DeadlineNearingTodosPresenter) {
    this.queryService = queryService;
    this.presenter = presenter;
  }

  public async handle(request: DeadlineNearingTodosInputData, _actor: UserEntity) {
    // TODO: request をチェックする
    // TODO: actorをチェックする
    // TODO: actorがfetchできる対象をconditionとして払い出す

    const result = await this.queryService.allDeadlineNearingTodos({
      dueDate: request.dueDate,
      daysBeforeWarning: this.daysBeforeWarning,
      paging: request?.paging,
    });

    const outputData: DeadlineNearingTodosOutputData = {
      edges: result?.todos?.map((todo) => ({ todo, cursor: todo.id })) ?? null,
      pageInfo: result?.pageInfo,
    };
    this.presenter.output(outputData);
  }
}
