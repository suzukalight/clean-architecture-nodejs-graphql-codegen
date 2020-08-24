import { Maybe } from 'schema/types';
import {
  AuthEmailPasswordEntity,
  AuthEmailPasswordDto,
} from '../../../entity/auth/AuthEmailPasswordEntity';

export interface AuthEmailPasswordRepository {
  getByEmail(email: string): Promise<Maybe<AuthEmailPasswordEntity>>;

  create(input: AuthEmailPasswordDto): Promise<Maybe<AuthEmailPasswordEntity>>;
}
