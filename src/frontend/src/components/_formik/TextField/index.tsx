import React from 'react';
import { TextField } from '@fluentui/react';

import { mapFieldToProps, FormAndField } from '../utils';

export const FormikTextField = <T extends string>({ field, form, ...props }: FormAndField<T>) => {
  const { errorMessage, ...fieldProps } = mapFieldToProps({ form, field });

  return <TextField errorMessage={errorMessage} {...props} {...fieldProps} />;
};
