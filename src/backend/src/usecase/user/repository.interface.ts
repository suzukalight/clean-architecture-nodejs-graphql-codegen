import { CreateUserRequest, User } from 'schema/types';
import { UserEntity } from 'domain-model/src/user/UserEntity';

export interface UserRepository {
  getById(id: string): Promise<UserEntity | null>;

  create(input: CreateUserRequest): Promise<UserEntity>;
}
