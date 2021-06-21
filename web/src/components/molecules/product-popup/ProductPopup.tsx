import { Splide, SplideSlide } from '@splidejs/react-splide';
import React, { useEffect, useState } from 'react';

import { ProductPopupDiv, PopupTitle } from './ProductPopup.styles';

import { ProductPopupProps } from '@interfaces/props/atoms.props';

import { handlerRequestErr } from '@functions/validate.functions';

import firebaseInstance from '@config/firebase.instance';

import '@splidejs/splide/dist/css/themes/splide-default.min.css';

const ProductPopup = ({ product }: ProductPopupProps) => {
  const [links, setLinks] = useState([] as string[]);

  useEffect(() => {
    product.imgs.forEach((img) => {
      firebaseInstance.storage
        .ref()
        .child(img)
        .getDownloadURL()
        .then((url: string) => {
          setLinks((state) => [...state, url]);
        })
        .catch(handlerRequestErr);
    });
  }, []);

  return (
    <ProductPopupDiv>
      <PopupTitle>{product.name}</PopupTitle>

      {links.length !== 0 && (
        <Splide options={{ width: '100%' }}>
          {links.map((url) => (
            <SplideSlide key={url}>
              <img src={url} alt={`imagen ${product.name}`} />
            </SplideSlide>
          ))}
        </Splide>
      )}
    </ProductPopupDiv>
  );
};

export default ProductPopup;
