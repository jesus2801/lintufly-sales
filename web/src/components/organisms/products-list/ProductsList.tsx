import React, { ChangeEvent } from 'react';

import { MainDiv, ProductsListGrid } from './ProductsList.styles';

import ProductCard from '@molecules/product-card/ProductCard';

import useProducts from '@hooks/useProducts';

import NoData from '@atoms/no-data/NoData';
import Input from '@atoms/input/Input';

const ProductsList = () => {
  const { data, searchProducts, deleteProductOfHook } = useProducts();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    searchProducts(e.currentTarget.value);
  };

  return (
    <>
      <Input placeholder="Realiza una búsqueda" onChange={handleChange} />

      {data.length === 0 ? (
        <MainDiv>
          <NoData />
        </MainDiv>
      ) : (
        <ProductsListGrid>
          {data.map((product) => (
            <ProductCard
              deleteProductOfHook={deleteProductOfHook}
              product={product}
              key={product._id}
            />
          ))}
        </ProductsListGrid>
      )}
    </>
  );
};

export default ProductsList;
