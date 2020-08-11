import { CreateUserRequest, CreateUserResponse } from 'schema/types';
import { UserEntity } from 'domain-model/src/user/UserEntity';

import { UserRepository } from './repository.interface';
import { CreateUserUseCase } from './usecase.interface';
import { CreateUserPresenter } from './presenter.interface';

const createCreateUserResponse = (userEntity: UserEntity): CreateUserResponse => ({
  user: userEntity.toJSON(),
});

export class CreateUserInteractor implements CreateUserUseCase {
  private repository: UserRepository;
  private presenter: CreateUserPresenter;

  constructor(repository: UserRepository, presenter: CreateUserPresenter) {
    this.repository = repository;
    this.presenter = presenter;
  }

  public async handle(request: CreateUserRequest) {
    const userEntity = await this.repository.create(request);

    this.presenter.output(createCreateUserResponse(userEntity));
  }
}
