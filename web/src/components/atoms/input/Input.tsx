import React from 'react';

import { InputProps } from '@interfaces/props/atoms.props';

import { InputStyles } from './Input.styles';

const Input = ({ icon, addRef, type, ...rest }: InputProps) => {
  return (
    <InputStyles>
      {icon ? (
        <>
          {icon}
          <input type={type || 'text'} ref={addRef} className="icon" {...rest} />
        </>
      ) : (
        <input type={type} ref={addRef} {...rest} />
      )}
      <div></div>
    </InputStyles>
  );
};

export default Input;
