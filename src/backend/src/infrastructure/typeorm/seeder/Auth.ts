import { Connection } from 'typeorm';
import { UserEntity, encryptPassword } from 'domain-model';

import { GqlAuthEmailPasswordRepository } from '../../../repository/typeorm/auth/repository/AuthEmailPassword';

/**
 * 指定されたユーザのEmail認証を作成
 * @param dbConnection
 * @param user
 */
export const seedAuth = async (dbConnection: Connection, user: UserEntity, email: string) => {
  const repository = new GqlAuthEmailPasswordRepository(dbConnection);

  const auth = {
    userId: user.getId().toString(),
    email,
    passwordEncrypted: await encryptPassword('password1234'),
  };
  return repository.create(auth);
};
