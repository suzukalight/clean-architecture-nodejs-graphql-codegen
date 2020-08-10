import { CreateUserRequest } from 'schema/types';
import { UserRepository } from '../../../usecase/user/repository.interface';
import { UserEntity } from 'domain-model/src/user/UserEntity';

export class InMemoryUserRepository implements UserRepository {
  private static idCounter = 0;

  public async create(user: CreateUserRequest) {
    return new UserEntity({
      id: `${++InMemoryUserRepository.idCounter}`,
      email: user.email,
    });
  }
}
