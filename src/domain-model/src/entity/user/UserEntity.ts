import { User } from 'schema/types';
import { PropertyRequiredError } from 'common/error/PropertyRequired';

import { ID } from '../common/ID';
import { Email } from '../common/Email';

export const isValidArguments = (user: User) => {
  if (!user) throw new PropertyRequiredError('user');
  if (!user.id) throw new PropertyRequiredError('id');
  if (!user.email) throw new PropertyRequiredError('email');
  return true;
};

export class UserEntity {
  private id: ID;
  private email: Email;

  constructor(user: User) {
    isValidArguments(user);
    this.id = new ID(user.id);
    this.email = new Email(user.email);
  }

  getID() {
    return this.id;
  }

  getEmail() {
    return this.email;
  }

  setId(id: ID) {
    this.id = id;
    this.isValid();
  }

  setEmail(email: Email) {
    this.email = email;
    this.isValid();
  }

  toJSON(): User {
    return {
      id: this.id.toString(),
      email: this.email.toString(),
    };
  }

  isValid(): boolean {
    return isValidArguments(this.toJSON());
  }
}
