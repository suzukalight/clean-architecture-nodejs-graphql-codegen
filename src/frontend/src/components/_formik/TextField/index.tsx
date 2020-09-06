import React from 'react';
import { TextField } from '@fluentui/react';

import { mapFieldToProps } from '../utils';

export const FormikTextField = ({ field, form, ...props }) => {
  const { errorMessage, ...fieldProps } = mapFieldToProps({ form, field });

  return <TextField errorMessage={errorMessage} {...props} {...fieldProps} />;
};
