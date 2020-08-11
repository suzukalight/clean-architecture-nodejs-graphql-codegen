import { CreateUserRequest, Maybe } from 'schema/types';
import { UserEntity } from 'domain-model/src/user/UserEntity';

export interface UserRepository {
  getById(id: string): Promise<Maybe<UserEntity>>;

  create(input: CreateUserRequest): Promise<UserEntity>;
}
