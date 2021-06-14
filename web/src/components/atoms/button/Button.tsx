import { ButtonProps } from '@interfaces/props/atoms.props';
import React from 'react';
import { SmallButton, SubmitButton } from './Button.styles';

const Button = ({ children, buttonType, ...rest }: ButtonProps) => {
  const cases = {
    submit: <SubmitButton {...rest}>{children}</SubmitButton>,
    small: <SmallButton {...rest}>{children}</SmallButton>,
  };

  return cases[buttonType];
};

export default Button;
