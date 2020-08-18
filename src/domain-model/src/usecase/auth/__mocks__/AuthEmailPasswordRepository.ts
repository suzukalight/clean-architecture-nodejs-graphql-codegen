import {
  AuthEmailPasswordEntity,
  AuthEmailPasswordDto,
} from '../../../entity/auth/AuthEmailPasswordEntity';
import { AuthEmailPasswordRepository as AuthEmailPasswordRepositoryIF } from '../interface/repository';

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

export class AuthEmailPasswordRepository implements AuthEmailPasswordRepositoryIF {
  private store: InMemoryStore;

  constructor() {
    this.store = createInMemoryStore();
  }

  public async getByEmail(email: string) {
    return (
      Array.from(this.store.entities.values()).find(
        (entity) => entity.getEmail().toString() === email,
      ) ?? null
    );
  }

  public async create(request: AuthEmailPasswordDto) {
    const id = `${++this.store.idCounter}`;
    const newEntity = new AuthEmailPasswordEntity(request);

    this.store.entities.set(id, newEntity);
    return newEntity;
  }
}
