import { ValidationError } from './Validation';

export class IllegalArgumentError extends ValidationError {
  constructor(message?: string) {
    super(message || '不正な引数です');
    this.name = 'IllegalArgumentError';
  }
}
