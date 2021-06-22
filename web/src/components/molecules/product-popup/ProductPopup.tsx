import React, { ChangeEvent, FocusEvent, useEffect, useRef, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';

import { AppCtx } from '@interfaces/context.interfaces';
import { ImageInfo } from './ProductPopup.interfaces';

import { alertDelete, handleLoading, success } from '@functions/alerts.functions';
import { handlerRequestErr, validateImageFile } from '@functions/validate.functions';

import firebaseInstance from '@config/firebase.instance';

import { UPDATE_PRODUCT } from '@graphql/mutations';

import {
  ProductPopupDiv,
  PopupTitle,
  ImagesGrid,
  ImageScreen,
} from './ProductPopup.styles';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import { cacheTag } from '@utils/variables';
import { setSelectedProduct } from '@context/actions/sales.actions';

const ProductPopup = () => {
  const { selectedProduct } = useSelector((state: AppCtx) => state.sales);
  const inputFileRef = useRef(null as null | HTMLInputElement);

  const dispatch = useDispatch();

  const [updateProduct] = useMutation(UPDATE_PRODUCT);

  const [name, setName] = useState(selectedProduct!.name);

  const [links, setLinks] = useState([] as ImageInfo[]);
  const [SplideLib, setSplideLib] = useState(null as any);

  useEffect(() => {
    let isMounted = true;

    import('@splidejs/react-splide').then((lib) => {
      if (isMounted) setSplideLib(lib);
    });

    selectedProduct!.imgs.forEach((img) => {
      firebaseInstance.storage
        .ref()
        .child(img)
        .getDownloadURL()
        .then((url: string) => {
          if (isMounted) setLinks((state) => [...state, { name: img, url }]);
        })
        .catch(handlerRequestErr);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleDeleteImage = (image: ImageInfo) => {
    alertDelete().then(async (confirmed) => {
      if (!confirmed) return;

      const newImages = links.map((l) => l.name).filter((name) => name !== image.name);

      try {
        handleLoading(true, 'Actualizando');
        await updateProduct({
          variables: {
            changes: { imgs: newImages },
            _id: selectedProduct!._id,
          },
        });
        handleLoading(false);

        setLinks(links.filter((l) => l.name !== image.name));
        dispatch(setSelectedProduct({ ...selectedProduct!, imgs: newImages }));

        success('El producto ha sido actualizado correctamente');
      } catch (e) {
        handlerRequestErr(e);
      }
    });
  };

  const handleUpdateName = async (e: FocusEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if (name === value) return;

    try {
      handleLoading(true, 'Actualizando');
      await updateProduct({
        variables: {
          _id: selectedProduct!._id,
          changes: { name: value },
        },
      });
      handleLoading(false);

      setName(value);
      dispatch(setSelectedProduct({ ...selectedProduct!, name: value }));
    } catch (e) {
      handlerRequestErr(e);
    }
  };

  const handleAddImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files![0];

    const response = validateImageFile(file, { generateUrl: true });
    if (!response.isValid) return;

    const completeName = v4() + file.name;

    try {
      handleLoading(true, 'Subiendo imagen, esto puede tardar');
      const res = await firebaseInstance.storage
        .ref()
        .child(`products-images/${completeName}`)
        .put(file, {
          contentType: file.type,
          cacheControl: cacheTag,
        });
      handleLoading(false);

      const newImgs = [...links.map((l) => l.name), res.metadata.fullPath];

      handleLoading(true, 'Guardando cambios');
      await updateProduct({
        variables: {
          _id: selectedProduct!._id,
          changes: {
            imgs: newImgs,
          },
        },
      });
      handleLoading(false);

      setLinks([...links, { name: completeName, url: response.url as string }]);
      console.log(selectedProduct);
      dispatch(setSelectedProduct({ ...selectedProduct!, imgs: newImgs }));
    } catch (e) {
      handlerRequestErr(e);
    }
  };

  const Slider = () =>
    links.length !== 0 && SplideLib !== null ? (
      <SplideLib.Splide options={{ width: '100%', fixedWidth: '20rm' }}>
        {links.map((img) => (
          <SplideLib.SplideSlide key={img.name}>
            <img src={img.url} alt={`imagen ${selectedProduct!.name}`} />
          </SplideLib.SplideSlide>
        ))}
      </SplideLib.Splide>
    ) : null;

  return (
    <ProductPopupDiv>
      <PopupTitle
        defaultValue={name}
        onBlur={handleUpdateName}
        placeholder="Ingresa el nombre del producto"
      />

      <Slider />

      <ImagesGrid>
        {links.map((img) => (
          <ImageScreen
            className="normal-image"
            onDoubleClick={() => handleDeleteImage(img)}
            key={img.name}
          >
            <img src={img.url} alt={`imagen ${selectedProduct!.name}`} />
          </ImageScreen>
        ))}

        <input
          type="file"
          ref={inputFileRef}
          className="non-display"
          onChange={handleAddImage}
        />

        <ImageScreen
          className="add-button"
          onClick={() => {
            if (inputFileRef.current) inputFileRef.current.click();
          }}
        >
          <img src="/static/icons/plus-sign.webp" alt="plus sign" />
        </ImageScreen>
      </ImagesGrid>
    </ProductPopupDiv>
  );
};

export default ProductPopup;
