import { TitleProps } from '@interfaces/props/atoms.props';
import React from 'react';

import { H1, H2, H3, H4, H5, H6 } from './Title.styles';

const Title = ({ children, type, theme, ...rest }: TitleProps) => {
  const cases = {
    h1: (
      <H1 theme={theme || {}} {...rest}>
        {children}
      </H1>
    ),
    h2: (
      <H2 theme={theme || {}} {...rest}>
        {children}
      </H2>
    ),
    h3: (
      <H3 theme={theme || {}} {...rest}>
        {children}
      </H3>
    ),
    h4: (
      <H4 theme={theme || {}} {...rest}>
        {children}
      </H4>
    ),
    h5: (
      <H5 theme={theme || {}} {...rest}>
        {children}
      </H5>
    ),
    h6: (
      <H6 theme={theme || {}} {...rest}>
        {children}
      </H6>
    ),
  };

  return type ? cases[type] : cases['h2'];
};

export default Title;
