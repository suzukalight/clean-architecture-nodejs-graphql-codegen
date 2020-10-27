import { UserDto } from '../../../entity/user';
import { denyIfNotSet } from '../../../policy/decision/common';
import { UserQueryService, GetUserByIdQuery } from '../interface/queryService';

type InMemoryStore = {
  entities: Map<string, UserDto>;
};
export const createInMemoryStore = (users: UserDto[]): InMemoryStore => ({
  entities: new Map<string, UserDto>(users.map((user) => [user.id, user])),
});

export class MockUserQueryService implements UserQueryService {
  private store: InMemoryStore;

  constructor(users: UserDto[]) {
    this.store = createInMemoryStore(users);
  }

  public async getUserById(query: GetUserByIdQuery) {
    denyIfNotSet(query, ['id']);
    const user = this.store.entities.get(query.id);
    return { user: user ?? null };
  }
}
