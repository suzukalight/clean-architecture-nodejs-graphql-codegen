import bcrypt from 'bcrypt';
import { PropertyRequiredError } from 'common/error/PropertyRequired';
import { IllegalArgumentError } from 'common/error/IllegalArgument';

const isValid = (passwordEncrypted: string) => {
  if (!passwordEncrypted) throw new PropertyRequiredError('passwordEncrypted');
  return true;
};

export class Password {
  private passwordEncrypted: string;

  constructor(passwordEncrypted: string) {
    isValid(passwordEncrypted);
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
    return await bcrypt.compare(plainPassword, this.passwordEncrypted);
  }
}

const regex = /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i;

const isValidPlainPassword = (passwordPlainText: string) => {
  if (!passwordPlainText) throw new PropertyRequiredError('passwordPlainText');
  if (!regex.test(passwordPlainText))
    throw new IllegalArgumentError(
      'パスワードは半角英字と半角数字を1つ以上含む、8文字以上100文字以下で入力してください',
    );
  return true;
};

export const encryptPassword = async (plainText: string, saltRounds = 10) => {
  isValidPlainPassword(plainText);
  return await bcrypt.hash(plainText, saltRounds);
};
