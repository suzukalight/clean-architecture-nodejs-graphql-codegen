export class NotFoundError extends Error {
  constructor(message?: string) {
    super(message || '対象が見つかりません');
    this.name = 'NotFoundError';
  }
}
