import React from 'react';

import { NoDataDiv } from './NoData.styles';

const NoData = () => {
  return (
    <NoDataDiv>
      <img src="/static/icons/tumbleweed.webp" />
      <h2>No hay nada por aquí</h2>
    </NoDataDiv>
  );
};

export default NoData;
