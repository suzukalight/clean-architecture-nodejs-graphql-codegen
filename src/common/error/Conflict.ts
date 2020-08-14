export class ConflictError extends Error {
  constructor(message?: string) {
    super(message || 'この操作の前に、競合する別の操作が行われたため、実行できませんでした');
    this.name = 'NotFoundError';
  }
}
