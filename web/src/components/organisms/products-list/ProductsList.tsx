import { useSelector } from 'react-redux';
import React from 'react';

import { MainDiv, ProductsListGrid } from './ProductsList.styles';

import ProductCard from '@molecules/product-card/ProductCard';

import { AppCtx } from '@interfaces/context.interfaces';

import NoData from '@atoms/no-data/NoData';

const ProductsList = () => {
  const { completeProducts } = useSelector((state: AppCtx) => state.sales);

  return completeProducts.length === 0 ? (
    <MainDiv>
      <NoData />
    </MainDiv>
  ) : (
    <ProductsListGrid>
      {completeProducts.map((product) => (
        <ProductCard product={product} key={product._id} />
      ))}
    </ProductsListGrid>
  );
};

export default ProductsList;
