import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';

import {
  alertDelete,
  handleLoading,
  showErr,
  success,
} from '@functions/alerts.functions';
import { handlerRequestErr } from '@functions/validate.functions';

import { ProductCardProps } from '@interfaces/props/molecules.props';
import { AppCtx } from '@interfaces/context.interfaces';

import firebaseInstance from '@config/firebase.instance';

import { ProductCardDiv } from './ProductCard.styles';

import { GET_PRODUCTS_LIST } from '@graphql/queries';
import { DELETE_PRODUCT } from '@graphql/mutations';
import { setSelectedProduct } from '@context/actions/sales.actions';

const ProductCard = ({ product, deleteProductOfHook }: ProductCardProps) => {
  const {
    employee: { payload },
  } = useSelector((state: AppCtx) => state);

  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    refetchQueries: [{ query: GET_PRODUCTS_LIST }],
    variables: {
      _id: product._id,
    },
  });

  const [image, setImage] = useState(null as null | string);

  const dispatch = useDispatch();

  useEffect(() => {
    if (product.imgs.length > 0) {
      firebaseInstance.storage
        .ref()
        .child(product.imgs[0])
        .getDownloadURL()
        .then(setImage)
        .catch(handlerRequestErr);
    }
  }, []);

  const handleDelete = () => {
    alertDelete().then(async (response) => {
      if (!response) return;

      try {
        handleLoading(true, 'Eliminando');
        await deleteProduct();
        handleLoading(false);

        success(`El producto "${product.name}" ha sido eliminado correctamente`);
        deleteProductOfHook(product._id);
      } catch (e) {
        handlerRequestErr(e);
      }
    });
  };

  const handleComments = () => {
    if (product.comments.length === 0) {
      showErr('Lo sentimos, este producto no posee comentarios');
      return;
    }

    //TODO: mostrar comentarios
  };

  const handleUpdate = () => {
    dispatch(
      setSelectedProduct({
        _id: product._id,
        imgs: product.imgs,
        name: product.name,
        price: product.price,
        desc: product.desc,
      }),
    );
  };

  return (
    <ProductCardDiv>
      <div className="main-ctn">
        {image ? (
          <div className="img-ctn">
            <img src={image} alt="" />
            <p>
              {product.price} {payload!.currency}
            </p>
          </div>
        ) : (
          <div className="no-img"></div>
        )}
        <div className="content">
          <h2>{product.name}</h2>
          <p
            className="desc"
            dangerouslySetInnerHTML={{
              __html: product.desc ? product.desc.replace(/\n/g, '<br />') : '',
            }}
          ></p>
        </div>

        <div className="buttons">
          <div className="icon red" onClick={handleDelete}>
            <img src="/static/icons/garbage.webp" alt="garbage icon" />
          </div>

          <div className="icon purple" onClick={handleUpdate}>
            <img src="/static/icons/edit.webp" alt="edit icon" />
          </div>

          <div className="icon black" onClick={handleComments}>
            <img src="/static/icons/chat.webp" alt="edit icon" />
          </div>
        </div>
      </div>
    </ProductCardDiv>
  );
};

export default ProductCard;
