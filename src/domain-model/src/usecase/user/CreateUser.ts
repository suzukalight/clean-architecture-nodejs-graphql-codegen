import { UserRepository } from './interface/repository';
import { CreateUserInputData, CreateUserUseCase } from './interface/usecase';
import { CreateUserOutputData, CreateUserPresenter } from './interface/presenter';

export class CreateUserInteractor implements CreateUserUseCase {
  private repository: UserRepository;
  private presenter: CreateUserPresenter;

  constructor(repository: UserRepository, presenter: CreateUserPresenter) {
    this.repository = repository;
    this.presenter = presenter;
  }

  public async handle(request: CreateUserInputData) {
    const userEntity = await this.repository.create(request);

    const outputData: CreateUserOutputData = { user: userEntity.toDto() };
    this.presenter.output(outputData);
  }
}

// TODO: 特権ユーザが Auth と連携してユーザインスタンスを作成するパターンを検討する
