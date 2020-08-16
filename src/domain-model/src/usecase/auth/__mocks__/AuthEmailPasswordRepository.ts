import { SignInEmailPasswordRequest } from 'schema/types';
import { NotFoundError } from 'common/error/NotFound';

import { RoleTypes } from '../../../entity/common/Role';
import { AuthEmailPasswordEntity } from '../../../entity/auth/AuthEmailPasswordEntity';
import { AuthEmailPasswordRepository as AuthEmailPasswordRepositoryIF } from '../interface/repository';
import { Email } from '../../../entity/common/Email';
import { encryptPassword } from '../../../entity/common/Password';

type InMemoryStore = {
  idCounter: number;
  entities: Map<string, AuthEmailPasswordEntity>;
};

export const createInMemoryStore = (
  idCounter = 0,
  entities: Map<string, AuthEmailPasswordEntity> = new Map<string, AuthEmailPasswordEntity>(),
): InMemoryStore => {
  return {
    idCounter,
    entities,
  };
};

const sharedStore = createInMemoryStore();

export class AuthEmailPasswordRepository implements AuthEmailPasswordRepositoryIF {
  private store: InMemoryStore;

  constructor(store?: InMemoryStore) {
    this.store = store ?? sharedStore;
  }

  public async getByEmail(email: string) {
    return (
      Array.from(this.store.entities.values()).find(
        (entity) => entity.getEmail().toString() === email,
      ) ?? null
    );
  }
}
