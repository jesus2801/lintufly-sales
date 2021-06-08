import React from 'react';

import { InputProps } from '@interfaces/props/atoms.props';

import { InputStyles } from './Input.styles';

const Input = ({ icon, addRef, type, ...rest }: InputProps) => {
  return (
    <InputStyles>
      {icon ? (
        <>
          {icon}
          <input type={type || 'text'} className="icon" {...rest} />
        </>
      ) : (
        <input ref={addRef} {...rest} />
      )}
      <div></div>
    </InputStyles>
  );
};

export default Input;
