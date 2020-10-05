import { UserRepository } from './interface/repository';
import { GetUserInputData, GetUserUseCase } from './interface/usecase';
import { GetUserPresenter } from './interface/presenter';

export class GetUserInteractor implements GetUserUseCase {
  private repository: UserRepository;
  private presenter: GetUserPresenter;

  constructor(repository: UserRepository, presenter: GetUserPresenter) {
    this.repository = repository;
    this.presenter = presenter;
  }

  public async handle(request: GetUserInputData) {
    const userEntity = await this.repository.getById(request.id);

    this.presenter.output(userEntity);
  }
}
