import { Maybe } from 'schema/types';
import { AuthEmailPasswordEntity } from '../../../entity/auth/AuthEmailPasswordEntity';

export interface AuthEmailPasswordRepository {
  getByEmail(email: string): Promise<Maybe<AuthEmailPasswordEntity>>;
}
