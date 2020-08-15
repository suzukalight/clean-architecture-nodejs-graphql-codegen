import { CreateUserRequest } from 'schema/types';
import { UserEntity } from 'domain-model/src/user/UserEntity';

import { UserRepository as UserRepositoryIF } from '../../usecase/user/interface/repository';

type InMemoryStore = {
  idCounter: number;
  entities: Map<string, UserEntity>;
};

export const createInMemoryStore = (idCounter = 0): InMemoryStore => {
  return {
    idCounter,
    entities: new Map<string, UserEntity>(),
  };
};

const sharedStore = createInMemoryStore();

export class UserRepository implements UserRepositoryIF {
  private store: InMemoryStore;

  constructor(store?: InMemoryStore) {
    this.store = store ?? sharedStore;
  }

  public async getById(id: string) {
    return this.store.entities.get(id) ?? null;
  }

  public async create(user: CreateUserRequest) {
    const id = `${++this.store.idCounter}`;
    const newEntity = new UserEntity({
      id,
      email: user.email,
    });

    this.store.entities.set(id, newEntity);
    return newEntity;
  }
}
