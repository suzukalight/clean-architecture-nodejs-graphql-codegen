import { User, Maybe } from 'schema/types';
import { UserEntity } from 'domain-model/src/user/UserEntity';

import { UserRepository } from './repository.interface';
import { GetUserUseCase } from './usecase.interface';
import { GetUserPresenter } from './presenter.interface';

class GetUserResponseFactory {
  public create(userEntity: Maybe<UserEntity>): Maybe<User> {
    return userEntity ? userEntity.toJSON() : null;
  }
}

export class GetUserInteractor implements GetUserUseCase {
  private userRepository: UserRepository;
  private getUserPresenter: GetUserPresenter;

  constructor(userRepository: UserRepository, getUserPresenter: GetUserPresenter) {
    this.userRepository = userRepository;
    this.getUserPresenter = getUserPresenter;
  }

  public async handle(id: string) {
    const userEntity = await this.userRepository.getById(id);

    const factory = new GetUserResponseFactory();
    this.getUserPresenter.output(factory.create(userEntity));
  }
}
