import { UserRepository } from './interface/repository';
import { GetUserUseCase } from './interface/usecase';
import { GetUserPresenter } from './interface/presenter';

export class GetUserInteractor implements GetUserUseCase {
  private repository: UserRepository;
  private presenter: GetUserPresenter;

  constructor(repository: UserRepository, presenter: GetUserPresenter) {
    this.repository = repository;
    this.presenter = presenter;
  }

  public async handle(id: string) {
    const userEntity = await this.repository.getById(id);

    this.presenter.output(userEntity);
  }
}
