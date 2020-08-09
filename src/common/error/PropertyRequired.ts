import { ValidationError } from './Validation';

export class PropertyRequiredError extends ValidationError {
  public property: string;

  constructor(property: string) {
    super(`${property} は必須のパラメータです`);
    this.name = 'PropertyRequiredError';
    this.property = property;
  }
}
