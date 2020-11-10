import { IllegalArgumentError, PropertyRequiredError } from '../../../error';
import { encryptPassword } from '../encrypt';

describe('PasswordEntityEncrypt', () => {
  test('OK: 半角英字と半角数字を1つ以上含み、8文字〜100文字で構成されている', () => {
    expect(encryptPassword('pass0987')).resolves.toBeDefined();
  });
  test('NG: 半角英字が含まれていない', () => {
    expect(encryptPassword('password')).rejects.toThrow(IllegalArgumentError);
  });
  test('NG: 半角数字が含まれていない', () => {
    expect(encryptPassword('12345678')).rejects.toThrow(IllegalArgumentError);
  });
  test('NG: パスワードが空文字', () => {
    expect(encryptPassword('')).rejects.toThrow(PropertyRequiredError);
  });
  test('NG: 7文字', () => {
    expect(encryptPassword('pass123')).rejects.toThrow(IllegalArgumentError);
  });
  test('NG: 101文字', () => {
    expect(
      encryptPassword(
        'password12password12password12password12password12password12password12password12password12password12p',
      ),
    ).rejects.toThrow(IllegalArgumentError);
  });
});
