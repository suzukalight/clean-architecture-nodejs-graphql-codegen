import { PropertyRequiredError, IllegalArgumentError } from 'common';

export const denyIllegalId = (id: string) => {
  if (!id) throw new PropertyRequiredError('id');
  return true;
};

export class ID {
  private id: string;

  constructor(id: string) {
    denyIllegalId(id);
    this.id = `${id}`;
  }

  getId() {
    return this.id;
  }

  toString() {
    return this.id;
  }

  isEqual(id: ID): boolean;
  isEqual(id: string): boolean;
  isEqual(id: unknown): boolean {
    if (id instanceof ID) return (id as ID).toString() === this.getId();
    if (typeof id === 'string') return id === this.getId();
    throw new IllegalArgumentError('比較可能なidではありません');
  }
}
