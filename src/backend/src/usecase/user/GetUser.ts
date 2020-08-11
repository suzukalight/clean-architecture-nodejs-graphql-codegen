import { User, Maybe } from 'schema/types';
import { UserEntity } from 'domain-model/src/user/UserEntity';

import { UserRepository } from './repository.interface';
import { GetUserUseCase } from './usecase.interface';
import { GetUserPresenter } from './presenter.interface';

const createGetUserResponse = (userEntity: Maybe<UserEntity>): Maybe<User> =>
  userEntity ? userEntity.toJSON() : null;

export class GetUserInteractor implements GetUserUseCase {
  private repository: UserRepository;
  private presenter: GetUserPresenter;

  constructor(repository: UserRepository, presenter: GetUserPresenter) {
    this.repository = repository;
    this.presenter = presenter;
  }

  public async handle(id: string) {
    const userEntity = await this.repository.getById(id);

    this.presenter.output(createGetUserResponse(userEntity));
  }
}
