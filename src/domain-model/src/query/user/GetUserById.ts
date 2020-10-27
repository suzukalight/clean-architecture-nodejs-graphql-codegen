import { UserQueryService } from './interface/queryService';
import { GetUserByIdInputData, GetUserByIdUseCase } from './interface/usecase';
import { GetUserByIdOutputData, GetUserByIdPresenter } from './interface/presenter';
import { UserEntity } from '../../entity/user/UserEntity';
import { denyIfNotSet } from '../../policy';

export class GetUserByIdInteractor implements GetUserByIdUseCase {
  private queryService: UserQueryService;
  private presenter: GetUserByIdPresenter;

  constructor(queryService: UserQueryService, presenter: GetUserByIdPresenter) {
    this.queryService = queryService;
    this.presenter = presenter;
  }

  public async handle(request: GetUserByIdInputData, actor: UserEntity) {
    denyIfNotSet(request, ['id']);
    denyIfNotSet(actor, ['id']);

    // TODO: actorがfetchできる対象をconditionとして払い出す
    const result = await this.queryService.getUserById({
      id: request.id,
    });

    const outputData: GetUserByIdOutputData = { user: result.user };
    this.presenter.output(outputData);
  }
}
