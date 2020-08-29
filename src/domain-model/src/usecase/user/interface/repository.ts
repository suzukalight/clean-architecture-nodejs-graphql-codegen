import { Maybe, CreateUserRequest } from 'schema';

import { UserEntity } from '../../../entity/user/UserEntity';

export interface UserRepository {
  getById(id: string): Promise<Maybe<UserEntity>>;

  create(input: CreateUserRequest): Promise<UserEntity>;
  update(user: UserEntity): Promise<UserEntity>;
}
