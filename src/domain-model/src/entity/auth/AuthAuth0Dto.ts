import { PropertyRequiredError } from 'common';

import { TimeStampTypes, denyDoesNotHaveRequiredProperties } from '../utils';

export type AuthAuth0Dto = {
  auth0UserId: string;
  userId: string;
} & TimeStampTypes;

export const denyIllegalAuthAuth0Dto = (auth: AuthAuth0Dto) => {
  if (!auth) throw new PropertyRequiredError('authAuth0');
  denyDoesNotHaveRequiredProperties(auth, ['auth0UserId']);
};
