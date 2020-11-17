import { compare } from 'bcrypt';

import { PropertyRequiredError, IllegalArgumentError } from '../../error';

export const denyIllegalPassword = (passwordEncrypted: string) => {
  if (!passwordEncrypted) throw new PropertyRequiredError('passwordEncrypted');
  return true;
};

export class Password {
  private passwordEncrypted: string;

  constructor(passwordEncrypted: string) {
    denyIllegalPassword(passwordEncrypted);
    this.passwordEncrypted = passwordEncrypted;
  }

  getPasswordEncrypted() {
    return this.passwordEncrypted;
  }

  toString() {
    return this.passwordEncrypted;
  }

  isEqual(password: Password): boolean;
  isEqual(password: string): boolean;
  isEqual(password: unknown): boolean {
    if (password instanceof Password)
      return (password as Password).toString() === this.getPasswordEncrypted();
    if (typeof password === 'string') return password === this.getPasswordEncrypted();
    throw new IllegalArgumentError('比較可能なpasswordではありません');
  }

  async compareWith(plainPassword: string) {
    return await compare(plainPassword, this.passwordEncrypted);
  }
}
