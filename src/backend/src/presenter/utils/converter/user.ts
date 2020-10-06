import { Role, User } from 'schema';
import { UserDto } from 'domain-model';

export const toGqlUser = (user: UserDto | null | undefined): User | null => {
  if (!user) return null;
  return {
    id: user.id,
    email: user.email,
    roles: (user.roles as unknown) as Role[],
  };
};
