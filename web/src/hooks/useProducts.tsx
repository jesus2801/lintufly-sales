import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

import { handlerRequestErr } from '@functions/validate.functions';
import { handleLoading } from '@functions/alerts.functions';

import { GET_PRODUCTS_LIST } from '@graphql/queries';
import { CompleteProduct } from '@interfaces/states';

const useProducts = () => {
  //extraemos la propiedad de la query
  const { data, loading, error } = useQuery(GET_PRODUCTS_LIST);

  //state en donde están los state filtrados
  const [filteredProducts, setFilteredProducts] = useState([] as CompleteProduct[]);
  const [originalProducts, setOriginalProducts] = useState([] as CompleteProduct[]);

  //use effect para cuando llegue la respuesta de la query
  useEffect(() => {
    if (data) {
      setFilteredProducts(data.getProducts);
      setOriginalProducts(data.getProducts);
    }
  }, [data]);

  //use effect por si hay un error en la consulta
  useEffect(() => {
    if (error) handlerRequestErr(error);
  }, [error]);

  //use effect para cuando esté cargando la consulta
  useEffect(() => {
    if (loading) handleLoading(true, 'Extrayendo productos');
    else handleLoading(false);
  }, [loading]);

  //función para buscar productos
  const searchProducts = (str: string) => {
    if (data === undefined) return;

    if (str.trim() === '') {
      setFilteredProducts(originalProducts);
      return;
    }

    setFilteredProducts(
      originalProducts.filter(
        (p) => p.name.toLowerCase().indexOf(str.trim().toLocaleLowerCase()) !== -1,
      ),
    );
  };

  const deleteProductOfHook = (_id: string) => {
    setFilteredProducts(filteredProducts.filter((p) => p._id !== _id));
    setOriginalProducts(originalProducts.filter((p) => p._id !== _id));
  };

  //retorno los productos filtrados y la función para buscar
  return {
    data: filteredProducts,
    searchProducts,
    deleteProductOfHook,
  };
};

export default useProducts;
