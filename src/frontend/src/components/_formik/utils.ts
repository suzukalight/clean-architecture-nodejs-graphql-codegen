import { getIn, FieldProps } from 'formik';

export type FormAndField<T = unknown> = Omit<FieldProps<T>, 'meta'>;

export function getErrorMessage<T = string>({ form, field }: FormAndField<T>): string | undefined {
  const error = getIn(form.errors, field.name);
  const touched = getIn(form.touched, field.name);
  return touched ? error : undefined;
}

export function mapFieldToProps<T = string>({ form, field }: FormAndField<T>) {
  return {
    ...field,
    errorMessage: getErrorMessage<T>({ form, field }),
  };
}
