import { AuthAuth0Entity, AuthAuth0Dto } from '../../../entity/auth';
import { AuthAuth0Repository } from '../interface/repository';

type InMemoryStore = {
  idCounter: number;
  entities: Map<string, AuthAuth0Entity>;
};

export const createInMemoryStore = (
  idCounter = 0,
  entities: Map<string, AuthAuth0Entity> = new Map<string, AuthAuth0Entity>(),
): InMemoryStore => {
  return {
    idCounter,
    entities,
  };
};

export class MockAuthAuth0Repository implements AuthAuth0Repository {
  private store: InMemoryStore;

  constructor() {
    this.store = createInMemoryStore();
  }

  public async getByAuth0UserId(email: string) {
    return (
      Array.from(this.store.entities.values()).find(
        (entity) => entity.getAuth0UserId().toString() === email,
      ) ?? null
    );
  }

  public async create(request: AuthAuth0Dto) {
    const id = `${++this.store.idCounter}`;
    const newEntity = new AuthAuth0Entity(request);

    this.store.entities.set(id, newEntity);
    return newEntity;
  }
}
