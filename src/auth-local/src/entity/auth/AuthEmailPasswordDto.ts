import { PropertyRequiredError, denyIllegalEmail, denyIllegalPassword } from 'common';

import { TimeStampTypes, denyDoesNotHaveRequiredProperties } from '../utils';

export type AuthEmailPasswordDto = {
  email: string;
  passwordEncrypted: string;
  userId: string;
} & TimeStampTypes;

export const denyIllegalAuthEmailPasswordDto = (auth: AuthEmailPasswordDto) => {
  if (!auth) throw new PropertyRequiredError('authEmailPassword');
  denyDoesNotHaveRequiredProperties(auth, ['email', 'passwordEncrypted', 'userId']);
  denyIllegalEmail(auth.email);
  denyIllegalPassword(auth.passwordEncrypted);
};
