import { UserRepository } from './repository.interface';
import { GetUserUseCase } from './usecase.interface';
import { GetUserPresenter } from './presenter.interface';

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
