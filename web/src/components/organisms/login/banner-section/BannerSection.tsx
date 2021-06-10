import Svg from '@atoms/Svg';
import React from 'react';

import { BannerSectionDiv } from './BannerSection.styles';

const BannerSection = () => {
  return (
    <BannerSectionDiv>
      <Svg path="/static/images/statistics-ilustration" />
    </BannerSectionDiv>
  );
};

export default BannerSection;
