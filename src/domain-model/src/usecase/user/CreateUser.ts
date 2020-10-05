import { UserRepository } from './interface/repository';
import { CreateUserInputData, CreateUserUseCase } from './interface/usecase';
import { CreateUserPresenter } from './interface/presenter';

export class CreateUserInteractor implements CreateUserUseCase {
  private repository: UserRepository;
  private presenter: CreateUserPresenter;

  constructor(repository: UserRepository, presenter: CreateUserPresenter) {
    this.repository = repository;
    this.presenter = presenter;
  }

  public async handle(request: CreateUserInputData) {
    const userEntity = await this.repository.create(request);

    this.presenter.output(userEntity);
  }
}
