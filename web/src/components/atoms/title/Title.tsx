import { TitleProps } from '@interfaces/props/atoms.props';
import React from 'react';

import { H1, H2, H3, H4, H5, H6 } from './Title.styles';

const Title = ({ children, type, theme }: TitleProps) => {
  const cases = {
    h1: <H1 theme={theme}>{children}</H1>,
    h2: <H2 theme={theme}>{children}</H2>,
    h3: <H3 theme={theme}>{children}</H3>,
    h4: <H4 theme={theme}>{children}</H4>,
    h5: <H5 theme={theme}>{children}</H5>,
    h6: <H6 theme={theme}>{children}</H6>,
  };

  return type ? cases[type] : cases['h2'];
};

export default Title;
