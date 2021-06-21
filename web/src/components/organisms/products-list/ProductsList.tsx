import { useDispatch, useSelector } from 'react-redux';
import React, { ChangeEvent, useEffect } from 'react';

import { setSelectedProduct } from '@context/actions/sales.actions';

import { MainDiv, ProductsListGrid } from './ProductsList.styles';

import ProductCard from '@molecules/product-card/ProductCard';

import { AppCtx } from '@interfaces/context.interfaces';

import useProducts from '@hooks/useProducts';
import usePopup from '@hooks/usePopup';

import NoData from '@atoms/no-data/NoData';
import Input from '@atoms/input/Input';

const ProductsList = () => {
  const { selectedProduct } = useSelector((state: AppCtx) => state.sales);
  const { data, searchProducts, deleteProductOfHook } = useProducts();
  const { Popup, setState, state } = usePopup({ maxWidth: '800px' });

  const dispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    searchProducts(e.currentTarget.value);
  };

  useEffect(() => {
    if (selectedProduct) setState(true);
    else setState(false);
  }, [selectedProduct]);

  useEffect(() => {
    if (!state && selectedProduct !== null) dispatch(setSelectedProduct(null));
  }, [state]);

  return (
    <>
      <Popup>{selectedProduct && (
        <div>
          <h1>{selectedProduct.name}</h1>
          <h1>alsdkjff</h1>
          <h1>alsdkjff</h1>
          <h1>alsdkjff</h1>
          <h1>alsdkjff</h1>
          <h1>alsdkjff</h1>
          <h1>alsdkjff</h1>
          <h1>alsdkjff</h1>
          <h1>alsdkjff</h1>
          <h1>alsdkjff</h1>
          <h1>alsdkjff</h1>
          <h1>alsdkjff</h1>
          <h1>alsdkjff</h1>
          <h1>alsdkjff</h1>
          <h1>alsdkjff</h1>
          <h1>alsdkjff</h1>
          <h1>alsdkjff</h1>
          <h1>alsdkjff</h1>
          <h1>alsdkjff</h1>
          <h1>alsdkjff</h1>
          <h1>alsdkjff</h1>
          <h1>alsdkjff</h1>
          <h1>alsdkjff</h1>
          <h1>alsdkjff</h1>
          <h1>alsdkjff</h1>
          <h1>alsdkjff</h1>
          <h1>alsdkjff</h1>
          <h1>alsdkjff</h1>
          <h1>alsdkjff</h1>
        </div>
      )}</Popup>

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
