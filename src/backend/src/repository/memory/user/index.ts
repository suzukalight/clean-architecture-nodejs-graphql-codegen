import { CreateUserRequest } from 'schema/types';
import { UserEntity } from 'domain-model/src/user/UserEntity';

import { UserRepository } from '../../../usecase/user/repository.interface';

export class InMemoryUserRepository implements UserRepository {
  private static idCounter = 0;
  private static entities = new Map<string, UserEntity>();

  public async getById(id: string) {
    return InMemoryUserRepository.entities.get(id) ?? null;
  }

  public async create(user: CreateUserRequest) {
    const id = `${++InMemoryUserRepository.idCounter}`;
    const newEntity = new UserEntity({
      id,
      email: user.email,
    });

    InMemoryUserRepository.entities.set(id, newEntity);
    return newEntity;
  }
}
