import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';

import { alertDelete, handleLoading, success } from '@functions/alerts.functions';
import { handlerRequestErr } from '@functions/validate.functions';

import { ProductCardProps } from '@interfaces/props/molecules.props';
import { AppCtx } from '@interfaces/context.interfaces';

import { setCompleteProducts } from '@context/actions/sales.actions';

import firebaseInstance from '@config/firebase.instance';

import { ProductCardDiv } from './ProductCard.styles';

import { DELETE_PRODUCT } from '@graphql/mutations';

const ProductCard = ({ product }: ProductCardProps) => {
  const {
    employee: { payload },
    sales: { completeProducts },
  } = useSelector((state: AppCtx) => state);

  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
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
        dispatch(
          setCompleteProducts(completeProducts.filter(({ _id }) => _id !== product._id)),
        );
      } catch (e) {
        handlerRequestErr(e);
      }
    });
  };

  return (
    <ProductCardDiv>
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

        <div className="buttons">
          <div className="icon red" onClick={handleDelete}>
            <img src="/static/icons/garbage.webp" alt="garbage icon" />
          </div>

          <div className="icon purple">
            <img src="/static/icons/edit.webp" alt="edit icon" />
          </div>

          <div className="icon black">
            <img src="/static/icons/chat.webp" alt="edit icon" />
          </div>
        </div>
      </div>
    </ProductCardDiv>
  );
};

export default ProductCard;
