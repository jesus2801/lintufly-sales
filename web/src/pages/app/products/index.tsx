import React from 'react';

import ProductsList from '@organisms/products-list/ProductsList';

import AppLayout from '@templates/app-layout/AppLayout';

const index = () => {
  return (
    <AppLayout title="Lista de Productos">
      <ProductsList />
    </AppLayout>
  );
};

export default index;
