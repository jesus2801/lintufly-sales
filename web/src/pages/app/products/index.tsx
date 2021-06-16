import { useQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';

import { setCompleteProducts } from '@context/actions/sales.actions';

import { handlerRequestErr } from '@functions/validate.functions';
import { handleLoading } from '@functions/alerts.functions';

import AppLayout from '@templates/app-layout/AppLayout';

import { GET_PRODUCTS_LIST } from '@graphql/queries';
import ProductsList from '@organisms/products-list/ProductsList';

const index = () => {
  const { data, loading, error } = useQuery(GET_PRODUCTS_LIST);

  const dispatch = useDispatch();

  useEffect(() => {
    if (data) dispatch(setCompleteProducts(data.getProducts));
  }, [data]);

  useEffect(() => {
    if (error) handlerRequestErr(error);
  }, [error]);

  useEffect(() => {
    if (loading) handleLoading(true, 'Extrayendo productos');
    else handleLoading(false);
  }, [loading]);

  return (
    <AppLayout title="Lista de Productos">
      <ProductsList />
    </AppLayout>
  );
};

export default index;
