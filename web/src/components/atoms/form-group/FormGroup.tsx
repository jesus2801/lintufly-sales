import React from 'react';
import Tippy from '@tippyjs/react';

import { FormGroupProps } from '@interfaces/props/atoms.props';

import { FormGroupDiv } from './FormGroup.styles';
import 'tippy.js/dist/tippy.css';

const FormGroup = ({
  children,
  label,
  HtmlFor,
  margin,
  info,
  ...rest
}: FormGroupProps) => {
  return (
    <FormGroupDiv theme={{ margin }} {...rest}>
      <div className="label-ctn">
        {label && <label htmlFor={HtmlFor}>{label}</label>}
        {info && (
          <Tippy content={info}>
            <img src="/static/icons/info.webp" />
          </Tippy>
        )}
      </div>
      {children}
    </FormGroupDiv>
  );
};

export default FormGroup;
