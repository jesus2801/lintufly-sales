import React from 'react';

import { FormGroupProps } from '@interfaces/props/atoms.props';

import { FormGroupDiv } from './FormGroup.styles';

const FormGroup = ({ children, label, HtmlFor, margin, ...rest }: FormGroupProps) => {
  return (
    <FormGroupDiv theme={{ margin }} {...rest}>
      {label && <label htmlFor={HtmlFor}>{label}</label>}
      {children}
    </FormGroupDiv>
  );
};

export default FormGroup;
