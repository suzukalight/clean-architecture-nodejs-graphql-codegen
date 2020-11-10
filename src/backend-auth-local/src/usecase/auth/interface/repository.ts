import { AuthEmailPasswordEntity, AuthEmailPasswordDto } from '../../../entity/auth';

export interface AuthEmailPasswordRepository {
  getByEmail(email: string): Promise<AuthEmailPasswordEntity | null>;

  create(input: AuthEmailPasswordDto): Promise<AuthEmailPasswordEntity | null>;
}
