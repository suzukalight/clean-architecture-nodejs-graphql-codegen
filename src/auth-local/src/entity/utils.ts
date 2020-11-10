import { PropertyRequiredError } from 'common';

export type TimeStampTypes = {
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const denyDoesNotHaveRequiredProperties = (entity: any, properties: string[]) => {
  properties.forEach((prop) => {
    if (!(prop in entity)) throw new PropertyRequiredError(prop);
  });
};
