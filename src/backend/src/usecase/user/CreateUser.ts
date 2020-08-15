import { CreateUserRequest } from 'schema/types';

import { UserRepository } from './interface/repository';
import { CreateUserUseCase } from './interface/usecase';
import { CreateUserPresenter } from './interface/presenter';

export class CreateUserInteractor implements CreateUserUseCase {
  private repository: UserRepository;
  private presenter: CreateUserPresenter;

  constructor(repository: UserRepository, presenter: CreateUserPresenter) {
    this.repository = repository;
    this.presenter = presenter;
  }

  public async handle(request: CreateUserRequest) {
    const userEntity = await this.repository.create(request);

    this.presenter.output(userEntity);
  }
}
