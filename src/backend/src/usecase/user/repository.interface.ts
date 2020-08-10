import { CreateUserRequest } from 'schema/types';
import { UserEntity } from 'domain-model/src/user/UserEntity';

export interface UserRepository {
  create(input: CreateUserRequest): Promise<UserEntity>;
}
