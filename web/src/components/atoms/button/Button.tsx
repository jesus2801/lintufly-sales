import { ButtonProps } from '@interfaces/props/atoms.props';
import React from 'react';
import { SubmitButton } from './Button.styles';

const Button = ({ children, buttonType, ...rest }: ButtonProps) => {
  const cases = {
    submit: <SubmitButton {...rest}>{children}</SubmitButton>,
  };

  return cases[buttonType];
};

export default Button;
