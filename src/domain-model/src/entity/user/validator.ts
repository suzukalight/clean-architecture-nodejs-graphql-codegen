import { User, Scalars } from '../../types';

export const isValid = (user: User) => {
  return !!user.id;
};
