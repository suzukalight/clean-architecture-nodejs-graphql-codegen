import {
  AuthEmailPasswordEntity,
  AuthEmailPasswordDto,
  AuthAuth0Entity,
  AuthAuth0Dto,
} from '../../../entity/auth';

export interface AuthEmailPasswordRepository {
  getByEmail(email: string): Promise<AuthEmailPasswordEntity | null>;

  create(input: AuthEmailPasswordDto): Promise<AuthEmailPasswordEntity | null>;
}

export interface AuthAuth0Repository {
  getByAuth0UserId(auth0UserId: string): Promise<AuthAuth0Entity | null>;

  create(input: AuthAuth0Dto): Promise<AuthAuth0Entity | null>;
}
