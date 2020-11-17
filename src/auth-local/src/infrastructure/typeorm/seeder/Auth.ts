import { Connection } from 'typeorm';
import { encryptPassword } from 'common';

import { GqlAuthEmailPasswordRepository } from '../../../repository/typeorm/auth/repository/AuthEmailPassword';

/**
 * 指定されたユーザのEmail認証を作成
 * @param dbConnection
 * @param user
 */
export const seedAuth = async (dbConnection: Connection, userId: string, email: string) => {
  const repository = new GqlAuthEmailPasswordRepository(dbConnection);

  const auth = {
    userId,
    email,
    passwordEncrypted: await encryptPassword('password1234'),
  };
  return repository.create(auth);
};
