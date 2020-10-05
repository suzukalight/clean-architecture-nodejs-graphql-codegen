import { AuthEmailPasswordDto } from './AuthEmailPasswordDto';
import { Email } from '../common/Email';
import { Password } from '../common/Password';
import { ID } from '../common/ID';

export class AuthEmailPasswordEntity {
  private email: Email;
  private passwordEncrypted: Password;
  private userId: ID;

  constructor({ email, passwordEncrypted, userId }: AuthEmailPasswordDto) {
    this.email = new Email(email);
    this.passwordEncrypted = new Password(passwordEncrypted);
    this.userId = new ID(userId);
  }

  getEmail() {
    return this.email;
  }

  getPassword() {
    return this.passwordEncrypted;
  }

  getUserId() {
    return this.userId;
  }
}
