import { PropertyRequiredError } from 'common';

import { denyIllegalEmail } from '../common/Email';
import { denyIllegalPassword } from '../common/Password';

export type AuthEmailPasswordDto = {
  email: string;
  passwordEncrypted: string;
  userId: string;
};

export const denyIllegalAuthEmailPasswordDto = (user: any) => {
  if (!user) throw new PropertyRequiredError('user');
  if (!user.email) throw new PropertyRequiredError('email');
  if (!user.passwordEncrypted) throw new PropertyRequiredError('passwordEncrypted');
  if (!user.userId) throw new PropertyRequiredError('userId');

  denyIllegalEmail(user.email);
  denyIllegalPassword(user.passwordEncrypted);
};
