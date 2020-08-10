import { CreateUserRequest, CreateUserResponse } from 'schema/types';
import { UserEntity } from 'domain-model/src/user/UserEntity';

import { UserRepository } from './repository.interface';
import { CreateUserUseCase } from './usecase.interface';
import { CreateUserPresenter } from './presenter.interface';

class CreateUserResponseFactory {
  public create(userEntity: UserEntity): CreateUserResponse {
    const user = userEntity.toJSON();
    return { user };
  }
}

export class CreateUserInteractor implements CreateUserUseCase {
  private userRepository: UserRepository;
  private createUserPresenter: CreateUserPresenter;

  constructor(userRepository: UserRepository, createUserPresenter: CreateUserPresenter) {
    this.userRepository = userRepository;
    this.createUserPresenter = createUserPresenter;
  }

  public async handle(request: CreateUserRequest) {
    const userEntity = await this.userRepository.create(request);
    const factory = new CreateUserResponseFactory();
    this.createUserPresenter.output(factory.create(userEntity));
  }
}
