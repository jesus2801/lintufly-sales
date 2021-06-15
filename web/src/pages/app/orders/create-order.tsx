import { useDispatch } from 'react-redux';
import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';

import { handlerRequestErr } from '@functions/validate.functions';

import { setMinProducts } from '@context/actions/sales.actions';

import { GET_MIN_PRODUCTS_INFO } from '@graphql/queries';

import AppLayout from '@templates/app-layout/AppLayout';

const CreateOrder = () => {
  const { data, error } = useQuery(GET_MIN_PRODUCTS_INFO);

  const dispatch = useDispatch();

  useEffect(() => {
    if (data) dispatch(setMinProducts(data.getProducts));
  }, [data]);

  useEffect(() => {
    if (error) handlerRequestErr(error);
  }, [error]);

  return (
    <AppLayout title="Agendar Pedido">
      <h1>Agendar pedido</h1>
    </AppLayout>
  );
};

export default CreateOrder;
