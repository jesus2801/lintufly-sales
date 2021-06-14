import React from 'react';

import { FormDivProps } from '@interfaces/props/molecules.props';

import { FormDivStyles } from './FormDiv.styles';

const FormDiv = ({ children, ...rest }: FormDivProps) => {
  return <FormDivStyles {...rest}>{children}</FormDivStyles>;
};

export default FormDiv;
