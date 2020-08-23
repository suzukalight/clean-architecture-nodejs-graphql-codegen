export class AuthenticationFailedError extends Error {
  constructor(message?: string) {
    super(message || '認証に失敗しました');
    this.name = 'AuthenticationFailedError';
  }
}
