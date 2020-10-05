import { PropertyRequiredError } from 'common';

import { denyIllegalEmail } from '../common/Email';
import { denyIllegalPassword } from '../common/Password';

export type AuthEmailPasswordDto = {
  email: string;
  passwordEncrypted: string;
  userId: string;
};

export const denyIllegalAuthEmailPasswordDto = (auth: AuthEmailPasswordDto) => {
  if (!auth) throw new PropertyRequiredError('user');
  if (!auth.email) throw new PropertyRequiredError('email');
  if (!auth.passwordEncrypted) throw new PropertyRequiredError('passwordEncrypted');
  if (!auth.userId) throw new PropertyRequiredError('userId');

  denyIllegalEmail(auth.email);
  denyIllegalPassword(auth.passwordEncrypted);
};
