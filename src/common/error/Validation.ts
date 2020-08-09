export class ValidationError extends Error {
  constructor(message?: string) {
    super(message || 'バリデーションに失敗しました');
    this.name = 'ValidationError';
  }
}
