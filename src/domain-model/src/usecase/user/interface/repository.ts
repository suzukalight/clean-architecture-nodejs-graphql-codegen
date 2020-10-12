import { UserEntity } from '../../../entity/user/UserEntity';
import { CreateUserInputData } from './usecase';

export interface UserRepository {
  getById(id: string): Promise<UserEntity | null>;

  create(input: CreateUserInputData): Promise<UserEntity>;
  update(user: UserEntity): Promise<UserEntity>;
  delete(id: string): Promise<UserEntity>;
}
