export class AuthenticationFailedError extends Error {
  constructor(message?: string) {
    super(message || 'その操作を実行できる認可がありません');
    this.name = 'AuthenticationFailedError';
  }
}
