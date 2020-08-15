import { PropertyRequiredError } from 'common/error/PropertyRequired';

const isValid = (id: string) => {
  if (!id) throw new PropertyRequiredError('id');
  return true;
};

export class ID {
  private id: string;

  constructor(id: string) {
    isValid(id);
    this.id = id;
  }

  getID() {
    return this.id;
  }

  toString() {
    return this.id;
  }
}
