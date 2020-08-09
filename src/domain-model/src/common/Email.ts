import { PropertyRequiredError } from 'common/error/PropertyRequired';
import { IllegalArgumentError } from 'common/error/IllegalArgument';

const regex = /[^\s]+@[^\s]+/;

const isValid = (email: string) => {
  if (!email) throw new PropertyRequiredError('email');
  if (!regex.test(email)) throw new IllegalArgumentError('正しいメールアドレスを指定してください');
  return true;
};

export class Email {
  private email: string;

  constructor(email: string) {
    isValid(email);
    this.email = email;
  }

  getEmail() {
    return this.email;
  }

  toString() {
    return this.email;
  }
}
