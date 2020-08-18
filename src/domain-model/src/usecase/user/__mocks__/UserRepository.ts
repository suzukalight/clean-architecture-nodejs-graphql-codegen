import { CreateUserRequest } from 'schema/types';
import { NotFoundError } from 'common/error/NotFound';

import { RoleTypes } from '../../../entity/common/Role';
import { UserEntity } from '../../../entity/user/UserEntity';
import { UserRepository as UserRepositoryIF } from '../interface/repository';

type InMemoryStore = {
  idCounter: number;
  entities: Map<string, UserEntity>;
};

export const createInMemoryStore = (
  idCounter = 0,
  entities: Map<string, UserEntity> = new Map<string, UserEntity>(),
): InMemoryStore => {
  return {
    idCounter,
    entities,
  };
};

export class UserRepository implements UserRepositoryIF {
  private store: InMemoryStore;

  constructor() {
    this.store = createInMemoryStore();
  }

  public async getById(id: string) {
    return this.store.entities.get(id) ?? null;
  }

  public async create(user: CreateUserRequest) {
    const id = `${++this.store.idCounter}`;
    const newEntity = new UserEntity({
      id,
      email: user.email,
      roles: [RoleTypes.Member],
    });

    this.store.entities.set(id, newEntity);
    return newEntity;
  }

  public async update(user: UserEntity) {
    const id = user.getID().toString();
    const targetEntity = this.store.entities.get(id);
    if (!targetEntity) throw new NotFoundError();

    this.store.entities.set(id, user);

    return user;
  }
}
