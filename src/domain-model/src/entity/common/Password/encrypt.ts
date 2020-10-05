import { hash } from 'bcrypt';
import { PropertyRequiredError, IllegalArgumentError } from 'common';

const regex = /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i;

export const denyIllegalPlainPassword = (passwordPlainText: string) => {
  if (!passwordPlainText) throw new PropertyRequiredError('passwordPlainText');
  if (!regex.test(passwordPlainText))
    throw new IllegalArgumentError(
      'パスワードは半角英字と半角数字を1つ以上含む、8文字以上100文字以下で入力してください',
    );
  return true;
};

export const encryptPassword = async (plainText: string, saltRounds = 10) => {
  denyIllegalPlainPassword(plainText);
  return await hash(plainText, saltRounds);
};
