import { TextAreaProps } from '@interfaces/props/atoms.props';
import React from 'react';
import { TextAreaStyles } from './TextArea.styles';

const TextArea = ({ children, ...rest }: TextAreaProps) => {
  return (
    <TextAreaStyles>
      <textarea {...rest}>{children}</textarea>
      <div></div>
    </TextAreaStyles>
  );
};

export default TextArea;
